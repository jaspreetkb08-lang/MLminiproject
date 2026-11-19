/**
 * STAYWISE AI API Service Layer
 * Runs in self-contained standalone mode by default with zero external network requests.
 * External Python FastAPI backend connection is completely optional.
 */

export function isExternalApiEnabled() {
  return localStorage.getItem("staywise_enable_external_api") === "true";
}

export function setExternalApiEnabled(enabled) {
  if (enabled) {
    localStorage.setItem("staywise_enable_external_api", "true");
  } else {
    localStorage.setItem("staywise_enable_external_api", "false");
  }
}

export function getApiBaseUrl() {
  return localStorage.getItem("staywise_api_url") || "";
}

export function setApiBaseUrl(url) {
  if (url) {
    localStorage.setItem("staywise_api_url", url);
  } else {
    localStorage.removeItem("staywise_api_url");
  }
}

/**
 * Check backend connection status only when explicitly called (e.g. from Settings button)
 */
export async function checkBackendHealth() {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl || !isExternalApiEnabled()) {
    return {
      online: false,
      modelLoaded: false,
      modelFile: "None",
      mode: "standalone",
      url: baseUrl || "None",
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const response = await fetch(`${baseUrl}/health`, {
      method: "GET",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return {
        online: true,
        modelLoaded: !!data.model_loaded,
        modelFile: data.model_file || "None",
        mode: data.mode || "demo",
        url: baseUrl,
      };
    }
  } catch (err) {
    // Network error
  }

  return {
    online: false,
    modelLoaded: false,
    modelFile: "None",
    mode: "standalone",
    url: baseUrl,
  };
}

/**
 * Submit booking parameters for cancellation prediction.
 * In default standalone mode, returns instantly without any network call or connection errors.
 */
export async function predictCancellation(bookingData) {
  // If external API is explicitly configured and enabled:
  if (isExternalApiEnabled()) {
    const baseUrl = getApiBaseUrl();
    if (baseUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const response = await fetch(`${baseUrl}/predict`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hotel_type: bookingData.hotelType,
            lead_time: parseInt(bookingData.leadTime, 10) || 0,
            arrival_date_year: parseInt(bookingData.arrivalYear, 10) || 2026,
            arrival_date_month: bookingData.arrivalMonth || "August",
            arrival_date_day_of_month: parseInt(bookingData.arrivalDate, 10) || 15,
            stays_in_weekend_nights: parseInt(bookingData.weekendNights, 10) || 0,
            stays_in_week_nights: parseInt(bookingData.weekNights, 10) || 0,
            adults: parseInt(bookingData.adults, 10) || 1,
            children: parseInt(bookingData.children, 10) || 0,
            country: bookingData.country || "PRT",
            market_segment: bookingData.marketSegment || "Online TA",
            distribution_channel: bookingData.distributionChannel || "TA/TO",
            is_repeated_guest: bookingData.isRepeatedGuest ? 1 : 0,
            previous_cancellations: parseInt(bookingData.previousCancellations, 10) || 0,
            deposit_type: bookingData.depositType || "No Deposit",
            customer_type: bookingData.customerType || "Transient",
            adr: parseFloat(bookingData.adr) || 100.0,
            total_of_special_requests: parseInt(bookingData.specialRequests, 10) || 0,
          }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const result = await response.json();
          return {
            ...result,
            source: result.is_demo ? "backend-demo" : "backend-ml-model",
          };
        }
      } catch (err) {
        // If external call failed, fallback cleanly
      }
    }
  }

  // --- SELF-CONTAINED DEMO MODE SIMULATOR (Instant, Zero Network Errors) ---
  return generateClientDemoPrediction(bookingData);
}

function generateClientDemoPrediction(bookingData) {
  const leadTime = parseInt(bookingData.leadTime, 10) || 0;
  const depositType = bookingData.depositType || "No Deposit";
  const specialRequests = parseInt(bookingData.specialRequests, 10) || 0;
  const prevCancellations = parseInt(bookingData.previousCancellations, 10) || 0;
  const isRepeated = !!bookingData.isRepeatedGuest;

  let riskScore = 0.22;
  if (leadTime > 180) riskScore += 0.35;
  else if (leadTime > 90) riskScore += 0.20;
  else if (leadTime > 30) riskScore += 0.10;
  else riskScore -= 0.12;

  if (depositType === "Non Refund") riskScore += 0.40;
  if (specialRequests >= 2) riskScore -= 0.25;
  else if (specialRequests === 1) riskScore -= 0.10;
  else riskScore += 0.08;

  if (prevCancellations > 0) riskScore += 0.25;
  if (isRepeated) riskScore -= 0.18;

  const probability = Math.max(0.08, Math.min(0.94, riskScore));
  const prediction = probability >= 0.50 ? 1 : 0;
  const confidence = Math.round((prediction === 1 ? probability : 1 - probability) * 1000) / 10;

  const riskDrivers = [];
  if (leadTime > 90) {
    riskDrivers.push(`High lead time (${leadTime} days) creates heightened exposure to schedule volatility.`);
  }
  if (depositType === "Non Refund") {
    riskDrivers.push("Non-refundable deposits in this dataset are heavily concentrated among speculative group holds with ~99% cancellation rate.");
  }
  if (specialRequests === 0) {
    riskDrivers.push("Absence of special requests signals passive reservation behavior.");
  }
  if (prevCancellations > 0) {
    riskDrivers.push(`History indicates ${prevCancellations} previous cancelled booking(s).`);
  }
  if (!riskDrivers.length) {
    riskDrivers.push("Direct booking dynamics and short booking lead time reflect strong commitment.");
  }

  const suggestedActions = prediction === 1
    ? [
        "Prompt guest with a personalized pre-arrival amenity selection email to reinforce commitment.",
        "Verify credit card pre-authorization 7 days prior to scheduled check-in.",
        "Permit strategic room overbooking buffer (+1 room) on this inventory segment.",
        "Reach out via WhatsApp / SMS concierge with localized itinerary guides."
      ]
    : [
        "Queue reservation for standard room assignment and housekeeping dispatch.",
        "Send tailored upgrade offer for luxury suite or fine dining experience.",
        "Prepare bespoke welcome gift based on selected special requests.",
        "Protect inventory without overbooking offset for this verified reservation."
      ];

  return {
    booking_id: `SW-DEMO-${Math.floor(10000 + Math.random() * 90000)}`,
    prediction,
    predicted_label: prediction === 1 ? "High Risk" : "Lower Risk",
    headline: prediction === 1
      ? "High Cancellation Risk — This booking is predicted to be cancelled."
      : "Lower Cancellation Risk — This booking is predicted to remain active.",
    model_name: "Random Forest Classifier (Demo Simulator)",
    confidence,
    probability_cancelled: Math.round(probability * 100) / 100,
    is_demo: true,
    source: "client-demo-fallback",
    explanation: prediction === 1
      ? `DEMO SIMULATION: The prototype model identified cancellation indicators with an estimated ${confidence}% risk factor. Real machine learning output requires connecting the Python backend.`
      : `DEMO SIMULATION: The prototype model identified favorable arrival signals with an estimated ${confidence}% stability factor. Real machine learning output requires connecting the Python backend.`,
    risk_drivers: riskDrivers,
    suggested_actions: suggestedActions,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
  };
}


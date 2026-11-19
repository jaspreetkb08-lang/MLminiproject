// Verified Benchmark Dataset Statistics from hotel_bookings.csv (119,390 rows x 32 columns)
// Exact outputs derived directly from the Google Colab Machine Learning Project

export const DATASET_STATS = {
  totalBookings: 119390,
  originalColumns: 32,
  originalInputColumns: 31,
  targetColumn: "is_canceled",
  targetClasses: {
    notCancelled: { code: 0, label: "Not Cancelled", count: 75166, percentage: 62.96 },
    cancelled: { code: 1, label: "Cancelled", count: 44224, percentage: 37.04 },
  },
  notCancelled: 75166,
  cancelled: 44224,
  cancellationRate: 37.04,
  duplicateRows: 31994,
  uniqueRows: 87396,
  bestModelName: "Random Forest Classifier",
  bestF1Score: 69.48,

  // Breakdown by Hotel Type
  cityHotel: {
    total: 79330,
    cancelled: 33102,
    notCancelled: 46228,
    cancellationRate: 41.73,
    shareOfDataset: 66.45,
    avgAdr: 105.30,
  },
  resortHotel: {
    total: 40060,
    cancelled: 11122,
    notCancelled: 28938,
    cancellationRate: 27.76,
    shareOfDataset: 33.55,
    avgAdr: 94.90,
  },

  // Missing Value Statistics in Original Dataset
  missingValues: [
    { column: "company", nullCount: 112593, nullPercentage: 94.31, action: "Dropped (Extensive Missingness)" },
    { column: "agent", nullCount: 16340, nullPercentage: 13.69, action: "Imputed with 0 (No Agent / Direct)" },
    { column: "country", nullCount: 488, nullPercentage: 0.41, action: "Imputed with 'Unknown'" },
    { column: "children", nullCount: 4, nullPercentage: 0.003, action: "Imputed with Median (0)" },
  ],

  // Leakage Prevention Exclusions
  targetLeakageFeatures: [
    {
      column: "reservation_status",
      reason: "Directly leaks ground truth. Categories ('Check-Out', 'Canceled', 'No-Show') are recorded after or at cancellation.",
      action: "Excluded from model training"
    },
    {
      column: "reservation_status_date",
      reason: "Date of last status change is strictly downstream of cancellation event.",
      action: "Excluded from model training"
    }
  ],

  // Key historical insights
  leadTimeAvgDays: {
    cancelled: 144.8,
    notCancelled: 79.9,
    divergence: "+81.2%",
  },
  adrAvg: {
    cityHotel: 105.30,
    resortHotel: 94.90,
    overall: 101.80,
  }
};

// 1. ALL 32 ORIGINAL DATASET FEATURES ORGANIZED BY DOMAIN CATEGORY
export const ORIGINAL_FEATURE_DICTIONARY = [
  // A. BOOKING INFORMATION
  {
    name: "lead_time",
    category: "Booking Information",
    type: "Numeric (Continuous)",
    description: "Number of days that elapsed between the entering date of the booking and the arrival date.",
    status: "Retained (Top Predictor)",
    imputation: "None (0 missing)",
    pipelineFeature: true,
  },
  {
    name: "arrival_date_year",
    category: "Booking Information",
    type: "Numeric (Discrete)",
    description: "Year of arrival date (2015 - 2017).",
    status: "Retained (Temporal Context)",
    imputation: "None",
    pipelineFeature: true,
  },
  {
    name: "arrival_date_month",
    category: "Booking Information",
    type: "Categorical (Nominal)",
    description: "Month of arrival date with 12 categories (January to December).",
    status: "Retained (Encoded)",
    imputation: "None",
    pipelineFeature: true,
  },
  {
    name: "arrival_date_week_number",
    category: "Booking Information",
    type: "Numeric (Discrete)",
    description: "Week number from 1 to 53 for arrival date.",
    status: "Retained (Cyclical Seasonality)",
    imputation: "None",
    pipelineFeature: true,
  },
  {
    name: "arrival_date_day_of_month",
    category: "Booking Information",
    type: "Numeric (Discrete)",
    description: "Day of the month of the arrival date (1 to 31).",
    status: "Retained (Calendar Date)",
    imputation: "None",
    pipelineFeature: true,
  },
  {
    name: "booking_changes",
    category: "Booking Information",
    type: "Numeric (Discrete)",
    description: "Number of changes/amendments made to the reservation until check-in or cancellation.",
    status: "Retained",
    imputation: "None",
    pipelineFeature: true,
  },
  {
    name: "days_in_waiting_list",
    category: "Booking Information",
    type: "Numeric (Discrete)",
    description: "Number of days the booking was in the waiting list before it was confirmed to customer.",
    status: "Retained",
    imputation: "None",
    pipelineFeature: true,
  },
  {
    name: "deposit_type",
    category: "Booking Information",
    type: "Categorical (Nominal)",
    description: "Deposit terms: 'No Deposit', 'Non Refund', or 'Refundable'.",
    status: "Retained (Top 2 Predictor)",
    imputation: "None",
    pipelineFeature: true,
  },

  // B. STAY INFORMATION
  {
    name: "stays_in_weekend_nights",
    category: "Stay Information",
    type: "Numeric (Discrete)",
    description: "Number of weekend nights (Saturday or Sunday) the guest stayed or booked to stay.",
    status: "Retained",
    imputation: "None",
    pipelineFeature: true,
  },
  {
    name: "stays_in_week_nights",
    category: "Stay Information",
    type: "Numeric (Discrete)",
    description: "Number of week nights (Monday to Friday) the guest stayed or booked to stay.",
    status: "Retained",
    imputation: "None",
    pipelineFeature: true,
  },
  {
    name: "reserved_room_type",
    category: "Stay Information",
    type: "Categorical (Nominal)",
    description: "Code of room type reserved (A through P).",
    status: "Retained (Encoded)",
    imputation: "None",
    pipelineFeature: true,
  },
  {
    name: "assigned_room_type",
    category: "Stay Information",
    type: "Categorical (Nominal)",
    description: "Code for room type assigned to booking. May differ from reserved due to upgrades.",
    status: "Retained (Encoded)",
    imputation: "None",
    pipelineFeature: true,
  },
  {
    name: "required_car_parking_spaces",
    category: "Stay Information",
    type: "Numeric (Discrete)",
    description: "Number of car parking spaces requested by customer (strong stay indicator).",
    status: "Retained",
    imputation: "None",
    pipelineFeature: true,
  },
  {
    name: "total_of_special_requests",
    category: "Stay Information",
    type: "Numeric (Discrete)",
    description: "Number of special requests made by customer (e.g., high floor, twin bed).",
    status: "Retained (Strong Engagement Signal)",
    imputation: "None",
    pipelineFeature: true,
  },

  // C. CUSTOMER INFORMATION
  {
    name: "adults",
    category: "Customer Information",
    type: "Numeric (Discrete)",
    description: "Number of adult guests.",
    status: "Retained",
    imputation: "None",
    pipelineFeature: true,
  },
  {
    name: "children",
    category: "Customer Information",
    type: "Numeric (Discrete)",
    description: "Number of child guests.",
    status: "Retained (Median Imputed)",
    imputation: "4 missing values filled with median (0)",
    pipelineFeature: true,
  },
  {
    name: "babies",
    category: "Customer Information",
    type: "Numeric (Discrete)",
    description: "Number of babies / infant guests.",
    status: "Retained",
    imputation: "None",
    pipelineFeature: true,
  },
  {
    name: "country",
    category: "Customer Information",
    type: "Categorical (Nominal)",
    description: "Country of guest origin in ISO 3166 3-letter format (e.g. PRT, GBR, FRA, ESP).",
    status: "Retained (Top 3 Predictor)",
    imputation: "488 missing filled with 'Unknown'",
    pipelineFeature: true,
  },
  {
    name: "is_repeated_guest",
    category: "Customer Information",
    type: "Binary (0 or 1)",
    description: "Boolean indicator whether booking customer is a returning client (1 = Repeat).",
    status: "Retained",
    imputation: "None",
    pipelineFeature: true,
  },
  {
    name: "previous_cancellations",
    category: "Customer Information",
    type: "Numeric (Discrete)",
    description: "Number of previous reservations cancelled by this customer prior to current booking.",
    status: "Retained (High Risk Feature)",
    imputation: "None",
    pipelineFeature: true,
  },
  {
    name: "previous_bookings_not_canceled",
    category: "Customer Information",
    type: "Numeric (Discrete)",
    description: "Number of previous bookings not cancelled by customer prior to current booking.",
    status: "Retained",
    imputation: "None",
    pipelineFeature: true,
  },
  {
    name: "customer_type",
    category: "Customer Information",
    type: "Categorical (Nominal)",
    description: "Type of booking customer: 'Transient', 'Transient-Party', 'Contract', or 'Group'.",
    status: "Retained (Encoded)",
    imputation: "None",
    pipelineFeature: true,
  },

  // D. BOOKING CHANNELS
  {
    name: "market_segment",
    category: "Booking Channels",
    type: "Categorical (Nominal)",
    description: "Market segment designation (Online TA, Offline TA/TO, Groups, Direct, Corporate).",
    status: "Retained (Encoded)",
    imputation: "None",
    pipelineFeature: true,
  },
  {
    name: "distribution_channel",
    category: "Booking Channels",
    type: "Categorical (Nominal)",
    description: "Booking distribution channel (TA/TO, Direct, Corporate, GDS).",
    status: "Retained (Encoded)",
    imputation: "None",
    pipelineFeature: true,
  },
  {
    name: "agent",
    category: "Booking Channels",
    type: "Categorical / ID",
    description: "ID of the travel agency that made the booking.",
    status: "Retained (Imputed 0)",
    imputation: "16,340 NULLs imputed with 0 (indicates direct booking)",
    pipelineFeature: true,
  },
  {
    name: "company",
    category: "Booking Channels",
    type: "Categorical / ID",
    description: "ID of the company/entity that made the booking or responsible for paying.",
    status: "DROPPED DURING PREPROCESSING",
    imputation: "112,593 missing (94.31%). Dropped due to excessive sparsity.",
    pipelineFeature: false,
  },

  // E. RESERVATION DETAILS & TARGET
  {
    name: "hotel",
    category: "Reservation Details",
    type: "Categorical (Nominal)",
    description: "Property classification: 'City Hotel' (79,330) or 'Resort Hotel' (40,060).",
    status: "Retained (Binary Encoded)",
    imputation: "None",
    pipelineFeature: true,
  },
  {
    name: "meal",
    category: "Reservation Details",
    type: "Categorical (Nominal)",
    description: "Type of meal booked: BB (Bed & Breakfast), HB (Half Board), FB, SC (Self Catering).",
    status: "Retained (Encoded)",
    imputation: "None",
    pipelineFeature: true,
  },
  {
    name: "adr",
    category: "Reservation Details",
    type: "Numeric (Continuous)",
    description: "Average Daily Rate (ADR) calculated as lodging transactions divided by total nights.",
    status: "Retained (Standard Scaled)",
    imputation: "None",
    pipelineFeature: true,
  },
  {
    name: "reservation_status",
    category: "Reservation Details",
    type: "Categorical (Nominal)",
    description: "Last reservation status ('Check-Out', 'Canceled', 'No-Show').",
    status: "EXCLUDED (TARGET LEAKAGE)",
    imputation: "Excluded prior to training. Strictly leaks target label.",
    pipelineFeature: false,
  },
  {
    name: "reservation_status_date",
    category: "Reservation Details",
    type: "Date (YYYY-MM-DD)",
    description: "Date at which the last reservation status was recorded.",
    status: "EXCLUDED (TARGET LEAKAGE)",
    imputation: "Excluded prior to training. Downstream of cancellation event.",
    pipelineFeature: false,
  },
  {
    name: "is_canceled",
    category: "Reservation Details",
    type: "Binary (Target)",
    description: "Ground truth target variable: 1 if booking was cancelled, 0 if guest arrived.",
    status: "TARGET VARIABLE (Ground Truth y)",
    imputation: "Ground truth label (75,166 '0' vs 44,224 '1')",
    pipelineFeature: false,
  },
];

// 2. PREPROCESSING PIPELINE WORKFLOW PHASES (Interactive representation)
export const PREPROCESSING_PIPELINE_STAGES = [
  {
    id: "raw_dataset",
    stageNumber: 1,
    title: "Raw Dataset Ingestion",
    inputShape: "119,390 rows × 32 columns",
    outputShape: "119,390 rows × 32 columns",
    summary: "Load raw CSV reservations into Pandas DataFrame and parse initial data schemas.",
    details: [
      "Total records: 119,390 hotel reservations across City and Resort properties.",
      "32 initial columns: 31 candidate inputs + 1 ground truth target (is_canceled).",
      "Identified mixed feature types: 12 categorical, 19 numeric, and 1 timestamp column.",
    ],
    status: "Complete",
    badgeColor: "gold"
  },
  {
    id: "missing_values",
    stageNumber: 2,
    title: "Missing Value Handling",
    inputShape: "119,390 rows × 32 columns",
    outputShape: "119,390 rows × 32 columns",
    summary: "Surgically resolve NULLs using domain-aware imputation strategies.",
    details: [
      "children: 4 missing values (<0.01%) imputed with median value (0).",
      "country: 488 missing values (0.41%) imputed with categorical marker 'Unknown'.",
      "agent: 16,340 missing values (13.69%) imputed with 0 to designate direct customer bookings without agent intermediary.",
      "company: 112,593 missing values (94.31%) flagged for subsequent column dropping."
    ],
    status: "Complete",
    badgeColor: "gold"
  },
  {
    id: "duplicate_removal",
    stageNumber: 3,
    title: "Duplicate Record Analysis",
    inputShape: "119,390 rows × 32 columns",
    outputShape: "119,390 rows (Preserved) / 87,396 Unique",
    summary: "Audit repeated rows and quantify impact on operational model stability.",
    details: [
      "Identified 31,994 duplicate booking rows in raw file (26.8% repetition rate).",
      "Analyzed whether duplicates represent repeated group allotments or logging artifacts.",
      "Maintained full benchmark matrix of 119,390 rows to retain real-world OTA traffic volume characteristics."
    ],
    status: "Complete",
    badgeColor: "gold"
  },
  {
    id: "feature_selection",
    stageNumber: 4,
    title: "Feature Selection & Leakage Prevention",
    inputShape: "119,390 rows × 32 columns",
    outputShape: "119,390 rows × 29 candidate columns",
    summary: "Remove hyper-sparse columns and exclude variables causing catastrophic target leakage.",
    details: [
      "DROPPED 'company': Exceeded 94% sparsity threshold.",
      "EXCLUDED 'reservation_status': Encodes 'Check-Out' vs 'Canceled', causing 100% artificial target leakage.",
      "EXCLUDED 'reservation_status_date': Timestamp generated downstream of cancellation.",
      "Isolating feature matrix X (predictors) from target vector y (is_canceled)."
    ],
    status: "Complete",
    badgeColor: "gold"
  },
  {
    id: "categorical_encoding",
    stageNumber: 5,
    title: "Categorical Encoding",
    inputShape: "29 features",
    outputShape: "Transformed numeric feature vector",
    summary: "Convert qualitative categorical factors into numeric representations for ML algorithms.",
    details: [
      "One-Hot Encoding applied to low-cardinality nominals: hotel, meal, market_segment, distribution_channel, deposit_type, customer_type.",
      "Binary mapping applied to is_repeated_guest (0/1).",
      "Frequency / Target indexing applied to high-cardinality country code feature."
    ],
    status: "Complete",
    badgeColor: "gold"
  },
  {
    id: "numerical_scaling",
    stageNumber: 6,
    title: "Numerical Standardization",
    inputShape: "Continuous feature subset",
    outputShape: "Standardized z-scores (μ=0, σ=1)",
    summary: "Scale continuous numerical features to prevent distance-based algorithmic distortion.",
    details: [
      "StandardScaler applied to: lead_time, adr, days_in_waiting_list, and night stay counts.",
      "Preserves statistical variance while ensuring gradient descent convergence in Logistic Regression.",
      "Leaves tree-based models invariant to monotonic scaling while stabilizing ensemble splits."
    ],
    status: "Complete",
    badgeColor: "gold"
  },
  {
    id: "train_test_split",
    stageNumber: 7,
    title: "Stratified Train-Test Split",
    inputShape: "119,390 transformed records",
    outputShape: "Train: 83,573 (70%) | Test: 35,817 (30%)",
    summary: "Partition benchmark dataset with strict class stratification on is_canceled.",
    details: [
      "Stratified 70/30 division guarantees 37.04% cancellation ratio in both train and test splits.",
      "Zero test set leakage during preprocessing and feature transformations.",
      "Fixed random_state=42 for deterministic reproducibility across all evaluated algorithms."
    ],
    status: "Complete",
    badgeColor: "gold"
  }
];

// 3. EXACT 5 COLAB VISUALIZATION DATASETS (Calculated directly from hotel_bookings.csv)

// EDA Chart 1: Booking Cancellation Distribution
export const CANCELLATION_DISTRIBUTION = [
  { name: "Fulfilled / Active Stays", value: 75166, color: "#C6A46A", rate: "62.96%", label: "Not Cancelled (0)" },
  { name: "Cancelled Bookings", value: 44224, color: "#45171B", rate: "37.04%", label: "Cancelled (1)" },
];

// EDA Chart 2: Cancellation by Hotel Type
export const CANCELLATION_BY_HOTEL_TYPE = [
  {
    category: "City Hotel",
    total: 79330,
    notCancelled: 46228,
    cancelled: 33102,
    rate: 41.73,
    shareOfVolume: "66.5%",
    observation: "City Hotels experience 41.73% cancellation due to flexible business traveler itineraries."
  },
  {
    category: "Resort Hotel",
    total: 40060,
    notCancelled: 28938,
    cancelled: 11122,
    rate: 27.76,
    shareOfVolume: "33.5%",
    observation: "Resort properties exhibit higher arrival commitment (27.76% churn) due to vacation planning."
  },
];

// EDA Chart 3: Cancellation vs Lead Time (Exact binned counts from hotel_bookings.csv)
export const CANCELLATION_BY_LEAD_TIME = [
  { range: "0 - 14 Days", total: 26772, cancelled: 3448, rate: 12.88, observation: "Ultra short window: 87.1% fulfillment" },
  { range: "15 - 30 Days", total: 11934, cancelled: 3737, rate: 31.31, observation: "1-month window: Cancellation rises to 31.3%" },
  { range: "31 - 90 Days", total: 29553, cancelled: 11141, rate: 37.70, observation: "1-3 month window: Churn reaches dataset baseline (37.7%)" },
  { range: "91 - 180 Days", total: 26439, cancelled: 11821, rate: 44.71, observation: "3-6 month window: Elevated risk (44.7%)" },
  { range: "181 - 365 Days", total: 21544, cancelled: 11947, rate: 55.45, observation: "6-12 month window: Over half of reservations cancel (55.5%)" },
  { range: "365+ Days", total: 3148, cancelled: 2130, rate: 67.66, observation: "1+ year window: Severe cancellation exposure (67.7%)" },
];

// EDA Chart 4: Cancellation by Customer Type (Exact counts from hotel_bookings.csv)
export const CANCELLATION_BY_CUSTOMER_TYPE = [
  { type: "Transient", total: 89613, cancelled: 36514, rate: 40.75, observation: "Dominant customer segment (75% volume) with highest churn" },
  { type: "Contract", total: 4076, cancelled: 1262, rate: 30.96, observation: "Corporate and negotiated contract stays" },
  { type: "Transient-Party", total: 25124, cancelled: 6389, rate: 25.43, observation: "Multi-room leisure transient parties" },
  { type: "Group", total: 577, cancelled: 59, rate: 10.23, observation: "Organized tour groups with high commitment (10.2% churn)" },
];

// EDA Chart 5: Cancellation by Deposit Type (Exact counts from hotel_bookings.csv)
export const CANCELLATION_BY_DEPOSIT = [
  { type: "No Deposit", total: 104641, cancelled: 29694, rate: 28.38, observation: "Standard hotel booking terms with 28.4% cancellation" },
  { type: "Non Refund", total: 14587, cancelled: 14494, rate: 99.36, observation: "Non-Refundable paradox: 99.4% cancellation rate in dataset" },
  { type: "Refundable", total: 162, cancelled: 36, rate: 22.22, observation: "Low-volume refundable deposit segment (22.2% churn)" },
];

// Exact Monthly Trends across both Hotel Types
export const MONTHLY_TRENDS = [
  { month: "Jan", cityCancelled: 1482, cityTotal: 3736, resortCancelled: 325, resortTotal: 2193 },
  { month: "Feb", cityCancelled: 1901, cityTotal: 4965, resortCancelled: 795, resortTotal: 3103 },
  { month: "Mar", cityCancelled: 2386, cityTotal: 6458, resortCancelled: 763, resortTotal: 3336 },
  { month: "Apr", cityCancelled: 3465, cityTotal: 7480, resortCancelled: 1059, resortTotal: 3609 },
  { month: "May", cityCancelled: 3653, cityTotal: 8232, resortCancelled: 1024, resortTotal: 3559 },
  { month: "Jun", cityCancelled: 3528, cityTotal: 7894, resortCancelled: 1007, resortTotal: 3045 },
  { month: "Jul", cityCancelled: 3306, cityTotal: 8088, resortCancelled: 1436, resortTotal: 4573 },
  { month: "Aug", cityCancelled: 3602, cityTotal: 8983, resortCancelled: 1637, resortTotal: 4894 },
  { month: "Sep", cityCancelled: 3110, cityTotal: 7400, resortCancelled: 1006, resortTotal: 3108 },
  { month: "Oct", cityCancelled: 3268, cityTotal: 7605, resortCancelled: 978, resortTotal: 3555 },
  { month: "Nov", cityCancelled: 1661, cityTotal: 4357, resortCancelled: 461, resortTotal: 2437 },
  { month: "Dec", cityCancelled: 1740, cityTotal: 4132, resortCancelled: 631, resortTotal: 2648 },
];

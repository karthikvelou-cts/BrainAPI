const blockedPatterns = [
  // Adult content
  /\b(porn|xxx|nude|explicit sex|sexual act|rape)\b/i,
  // Violence / harm
  /\b(kill|murder|behead|bomb attack|massacre|torture)\b/i,
  // Hate/offensive
  /\b(hate speech|racial slur|ethnic cleansing|genocide)\b/i,
  // Self-harm / vulnerability
  /\b(suicide|self harm|cutting myself|overdose intentionally)\b/i,
];

const collectText = (payload) => {
  const parts = [
    payload?.question || "",
    payload?.correct_answer || "",
    ...(Array.isArray(payload?.incorrect_answers) ? payload.incorrect_answers : []),
  ];
  return parts.join(" ").trim();
};

export const validateQuestionContentSafety = (payload) => {
  const text = collectText(payload);
  if (!text) return null;

  const matched = blockedPatterns.find((pattern) => pattern.test(text));
  if (!matched) return null;

  return {
    message: "Content policy violation: offensive, violence, adult, or vulnerable/self-harm text detected.",
  };
};

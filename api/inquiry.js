// Vercel Serverless Function - Handle inquiry form submissions
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { company, name, email, country, product, message } = req.body;

    // Log the submission (useful for debugging)
    console.log("New inquiry:", { company, name, email, country, product, message });

    // You can connect to email service here (Resend, SendGrid, etc.)
    // For now, we'll just acknowledge receipt
    // The emails will be visible in Vercel logs

    res.status(200).json({
      success: true,
      message: "Inquiry received. We will contact you within 24 hours.",
    });
  } catch (error) {
    console.error("Form error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

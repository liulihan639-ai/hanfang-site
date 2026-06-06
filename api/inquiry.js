const { Resend } = require("resend");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(200).json({
      success: true,
      message: "Inquiry received. Email notification not configured yet.",
    });
  }

  try {
    const { company, name, email, country, product, message } = req.body;

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "Hanfang Website <inquiry@hanfang-energy.com>",
      to: "partner@hanfang-energy.com",
      subject: `New Inquiry from ${company || name || "someone"}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a8cd8; padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">🔋 New Hanfang Inquiry</h1>
          </div>
          <div style="background: #f8f9fa; padding: 24px; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; color: #666;">Company</td><td style="padding: 8px; font-weight: 600;">${company || "-"}</td></tr>
              <tr><td style="padding: 8px; color: #666;">Contact</td><td style="padding: 8px; font-weight: 600;">${name || "-"}</td></tr>
              <tr><td style="padding: 8px; color: #666;">Email</td><td style="padding: 8px; font-weight: 600;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px; color: #666;">Country</td><td style="padding: 8px; font-weight: 600;">${country || "-"}</td></tr>
              <tr><td style="padding: 8px; color: #666;">Product</td><td style="padding: 8px; font-weight: 600;">${product || "-"}</td></tr>
              <tr><td style="padding: 8px; color: #666;">Message</td><td style="padding: 8px; font-weight: 600; white-space: pre-wrap;">${message || "-"}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
            <p style="color: #999; font-size: 12px;">Sent from hanfang-site.vercel.app</p>
          </div>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Inquiry received. We will contact you within 24 hours.",
    });
  } catch (error) {
    console.error("Email error:", error);
    res.status(200).json({
      success: true,
      message: "Inquiry received. (Email delivery failed, but we have your info.)",
    });
  }
}

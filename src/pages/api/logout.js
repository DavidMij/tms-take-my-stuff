export default async function logout(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      res.setHeader(
        "Set-Cookie",
        "tmsToken=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0"
      );

      return res.status(200).json({ message: "Successfully logged out" });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred while logging out. Please try again later.",
      });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

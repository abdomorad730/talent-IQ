export const PISTON_API = "https://emkc.org/api/v2/piston";

export const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
};
export async function executeCode(req, res, next) {
  try {
    const { language, code } = req.body;

    const config = LANGUAGE_CONFIG[language];

    if (!config) {
      return res.status(400).json({
        success: false,
        error: "Unsupported language",
      });
    }

    const response = await axios.post(PISTON_URL, {
      language: config.lang,
      version: config.version,
      files: [
        {
          name: `main.${config.ext}`,
          content: code,
        },
      ],
    });

    const run = response.data.run;

    return res.json({
      success: run.stderr ? false : true,
      output: run.stdout || "",
      error: run.stderr || "",
    });
    } catch (error) {
    console.error("Error executing code:", error);
    return res.status(500).json({
      success: false,
      error: "An error occurred while executing the code",
    });
  }
}
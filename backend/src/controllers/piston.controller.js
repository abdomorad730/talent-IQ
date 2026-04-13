export default async function handler(req, res) {
  try {
    const { language, code } = req.body;

    const LANGUAGE_CONFIG = {
      javascript: { lang: "javascript", version: "18.15.0", ext: "js" },
      python: { lang: "python", version: "3.10.0", ext: "py" },
      java: { lang: "java", version: "15.0.2", ext: "java" },
    };

    const config = LANGUAGE_CONFIG[language];

    if (!config) {
      return res.status(400).json({
        success: false,
        error: "Unsupported language",
      });
    }

    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: config.lang,
        version: config.version,
        files: [
          {
            name: `main.${config.ext}`,
            content: code,
          },
        ],
      }),
    });
    console.log(response)
    const data = await response.json();

    return res.status(200).json({
      success: !data.run.stderr,
      output: data.run.stdout || "",
      error: data.run.stderr || "",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
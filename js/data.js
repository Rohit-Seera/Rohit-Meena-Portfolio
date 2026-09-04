/* Update this file to add projects or experience without touching the layout. */
window.portfolioData = {
  engineer: {
    description: "Designing RAG, agentic workflows, and full-stack AI experiences that can earn their place in real life.",
    projects: [
      { id: "mistella", number: "01", name: "Mistella", kind: "Full-stack GenAI workspace", visual: "workspace", tags: ["FastAPI", "LangGraph", "RAG", "React"], hook: "One workspace for conversations, documents, images, and research.", details: "Mistella combines LLM chat, persistent memory, multimodal image understanding, document-grounded RAG, and research tools into one focused interface. The backend uses FastAPI with LangChain/LangGraph orchestration and SSE streaming. Its retrieval layer pairs PDF parsing, embeddings, FAISS vector search, and BM25 for context-aware answers.", metric: "MULTIMODAL / STREAMING" },
      { id: "healthcare", number: "02", name: "Healthcare classifier", kind: "Neural network / PyTorch", visual: "network", tags: ["PyTorch", "ANN", "scikit-learn"], hook: "A clear diagnostic prediction pipeline built from tabular medical data.", details: "A 3-layer binary classifier (30 → 16 → 8 → 1) for breast-cancer diagnosis. It uses ReLU hidden layers, sigmoid output, binary cross-entropy, and SGD over 200 epochs. Evaluation includes scikit-learn metrics and visual training diagnostics.", metric: "99.12% TEST ACCURACY" },
      { id: "student", number: "03", name: "Student success predictor", kind: "Machine learning / Analytics", visual: "chart", tags: ["Logistic Regression", "SMOTE", "ROC"], hook: "A robust early-signal model for academic pass/fail prediction.", details: "A logistic-regression pipeline that addresses imbalanced data through SMOTE and class-weight optimisation. Its evaluation suite includes a classification report, confusion matrix, and ROC analysis—keeping model performance visible and interpretable.", metric: "IMBALANCE-AWARE ML" }
    ],
    experience: [
      { year: "2026", role: "Generative AI Intern", place: "PhotoGPT · TAIC LLC", note: "Worked across 10+ GenAI platforms; created 300+ visual assets for campaigns reaching 10M+ views." },
      { year: "2025", role: "Core Member", place: "Podyssey · Startup", note: "Used generative AI tools to support content and community initiatives." },
      { year: "2025", role: "Creative Lead · Documentary", place: "NIIMACK Fest · IIIT Bhopal", note: "Directed the official fest documentary through editing, VFX, colour grading, and narrative storytelling." }
    ]
  },
  creative: {
    description: "A focused creative practice across VFX, editing, prompt direction, and AI-assisted visual production. The dedicated reel is the next release.",
    projects: [
      { id: "photogpt", number: "01", name: "AI visual production", kind: "Generative AI / Creative automation", visual: "frame", tags: ["Image Gen", "Video Gen", "Prompting"], hook: "300+ images, videos, ads, thumbnails, and product stories—built for momentum.", details: "During the PhotoGPT internship, I worked across 10+ GenAI platforms for image and video generation, creative automation, and model benchmarking. The focus: improve visual quality, consistency, and the efficiency of the creative workflow.", metric: "10M+ CAMPAIGN VIEWS" },
      { id: "niimack", number: "02", name: "NIIMACK Fest film", kind: "Editing / VFX / Direction", visual: "film", tags: ["VFX", "Colour", "Story"], hook: "The official fest documentary, shaped from the cut to the final colour.", details: "As creative lead, I edited and produced the IIIT Bhopal NIIMACK Fest documentary, balancing VFX, colour grading, video editing, and narrative storytelling.", metric: "OFFICIAL DOCUMENTARY" },
      { id: "identity", number: "03", name: "Alumni Reconnect identity", kind: "Visual identity", visual: "identity", tags: ["Branding", "Logo Design"], hook: "A mark designed to give IIIT Bhopal alumni engagement a recognisable signal.", details: "Designed the official logo for the IIIT Bhopal Alumni Reconnect Cell, strengthening the initiative’s visual identity and presence.", metric: "IIIT BHOPAL" }
    ],
    experience: [
      { year: "NOW", role: "VFX & editor mode", place: "Portfolio reel in development", note: "This dedicated creative page is intentionally ready for the next wave of showreels, breakdowns, and campaign work." },
      { year: "2026", role: "Generative AI Intern", place: "PhotoGPT · TAIC LLC", note: "Created 300+ AI-powered visual assets and tested emerging creative models." },
      { year: "2025", role: "Creative Lead", place: "NIIMACK Fest · IIIT Bhopal", note: "Edited and produced the official fest documentary." }
    ]
  }
};

"""Application configuration using environment variables."""

import os
from dataclasses import dataclass, field


@dataclass
class Settings:
    APP_NAME: str = "GreenPulse"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = field(default_factory=lambda: os.getenv("DEBUG", "false").lower() == "true")

    HOST: str = field(default_factory=lambda: os.getenv("HOST", "0.0.0.0"))
    PORT: int = field(default_factory=lambda: int(os.getenv("PORT", "8000")))

    DATABASE_URL: str = field(
        default_factory=lambda: os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./greenpulse.db")
    )

    AZURE_API_KEY: str = field(default_factory=lambda: os.getenv("AZURE_API_KEY", ""))
    AZURE_ENDPOINT: str = field(
        default_factory=lambda: os.getenv(
            "AZURE_ENDPOINT",
            "https://admin-mm4mum0p-eastus2.cognitiveservices.azure.com/openai/responses",
        )
    )
    AZURE_API_VERSION: str = field(default_factory=lambda: os.getenv("AZURE_API_VERSION", "2025-04-01-preview"))
    AZURE_MODEL: str = field(default_factory=lambda: os.getenv("AZURE_MODEL", "gpt-5.2-chat"))

    # Data source API keys
    SERPAPI_KEY: str = field(default_factory=lambda: os.getenv("SERPAPI_KEY", ""))
    SEMANTIC_SCHOLAR_KEY: str = field(default_factory=lambda: os.getenv("SEMANTIC_SCHOLAR_KEY", ""))

    # Agent scheduling
    PATENT_SCAN_INTERVAL_MINUTES: int = field(
        default_factory=lambda: int(os.getenv("PATENT_SCAN_INTERVAL_MINUTES", "60"))
    )
    PAPER_SCAN_INTERVAL_MINUTES: int = field(
        default_factory=lambda: int(os.getenv("PAPER_SCAN_INTERVAL_MINUTES", "120"))
    )
    NEWS_SCAN_INTERVAL_MINUTES: int = field(
        default_factory=lambda: int(os.getenv("NEWS_SCAN_INTERVAL_MINUTES", "30"))
    )

    CORS_ORIGINS: list = field(default_factory=lambda: ["*"])

    FRONTEND_DIR: str = field(
        default_factory=lambda: os.getenv("FRONTEND_DIR", os.path.join(os.path.dirname(__file__), "../../frontend"))
    )


settings = Settings()

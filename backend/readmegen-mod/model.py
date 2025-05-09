from database.core import Base
from sqlalchemy import String, ForeignKey, DateTime
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID
import uuid
from typing import Optional
from pydantic import HttpUrl
from datetime import datetime, timezone


class Readme(Base):
    __tablename__ = "readmes"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    # name: Mapped[str] = mapped_column(String(100))
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id"), nullable=False)
    repository_url: Mapped[HttpUrl] = mapped_column(String(2083), nullable=False)
    readme: Mapped[str] = mapped_column(String(), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(timezone.utc))

    #cria relacionamento para facilitar query
    user = relationship("User", back_populates="readmes")
    



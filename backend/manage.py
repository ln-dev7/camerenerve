import argparse
from camerenerve.database import engine, SessionLocal
from camerenerve.models import Base


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "command",
        type=str,
        choices=["init", "reset"]
    )

    command = parser.parse_args().command
    session = SessionLocal()
    meta = Base.metadata
    meta.bind = engine
    if command == "init":
        meta.create_all()
        session.commit()

    if command == "reset":
        meta.drop_all()
        meta.create_all()
        session.commit()


if __name__ == "__main__":
    main()
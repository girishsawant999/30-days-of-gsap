import Link from "next/link";

export default function Home() {
  const days = 30;
  const activeDays = 13;

  return (
    <div className="grid max-w-5xl px-10 mx-auto py-10 gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr)))] ">
      {Array.from({ length: days }, (_, i) =>
        activeDays >= i + 1 ? (
          <Link
            key={i}
            className="hover:underline transition"
            href={`/day-${i + 1}`}
          >
            Day {i + 1}
          </Link>
        ) : (
          <div key={i} className="text-gray-400">
            Day {i + 1}
          </div>
        )
      )}
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/credits/list")
      .then((res) => res.json())
      .then((data) => setCredits(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Available Credits</h1>
      <ul>
        {credits.map((credit: any) => (
          <li key={credit.id} className="border p-2 mb-2 rounded">
            {credit.category} - {credit.state} - {credit.quantity}MT @ ₹{credit.price}/MT
          </li>
        ))}
      </ul>
    </div>
  );
}

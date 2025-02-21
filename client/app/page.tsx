"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [blocs, setBlocs] = useState<any[]>([]);
  const [lastBloc, setLastBloc] = useState<{ name: string; ip: string } | null>(
    null
  );
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  // Fetch all blocs on component mount
  useEffect(() => {
    const fetchBlocs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blocs");
        setBlocs(response.data.data);
      } catch (err) {
        console.error("Error fetching blocs:", err);
        toast.error("❌ Erreur lors de la récupération des blocs");
      }
    };
    fetchBlocs();
  }, []);

  const fetchRandomBloc = async () => {
    if (blocs.length === 0) {
      toast.error("❌ Aucun bloc trouvé !");
      return;
    }

    setLoading(true);

    try {
      let randomBloc;
      let attempts = 0;

      // Pick a new bloc that is different from the last one
      do {
        randomBloc = blocs[Math.floor(Math.random() * blocs.length)];
        attempts++;
      } while (randomBloc.name === lastBloc?.name && attempts < 5);

      setLastBloc({ name: randomBloc.name, ip: randomBloc.pager.ip });

      // 🔥 Show Notification IMMEDIATELY
      const toastId = toast.success(
        `🚨 Alerte envoyée: ${randomBloc.name} (IP: ${randomBloc.pager.ip})`,
        {
          position: "top-right",
          autoClose: 90000, // Closes after 1.5 minutes
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        }
      );

      // If there's only one bloc, disable the button after first alert
      if (blocs.length === 1) {
        setIsDisabled(true);
      }

      // Optional: Manually close after 1.5 minutes (if needed)
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 90000);
    } catch (err) {
      console.error("Error fetching bloc:", err);
      toast.error("❌ Erreur lors de la récupération du bloc");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-20 h-screen">
      <h1 className="text-center text-xl font-semibold text-white mb-5">
        Un bouton pour envoyer une alerte au docteur basé sur un bloc et un
        pager aléatoire
      </h1>

      <button
        onClick={fetchRandomBloc}
        disabled={loading || isDisabled}
        className="bg-white p-2 px-6 bg-primary text-black rounded-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
      >
        {loading
          ? "Chargement..."
          : isDisabled
          ? "Alerte déjà envoyée"
          : "Envoyer une alerte"}
      </button>

      <ToastContainer />
    </div>
  );
}

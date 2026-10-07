"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

// 1. On définit la structure d'un commentaire
interface Comment {
  id: string;
  content: string;
  author?: {
    username: string;
  };
}

interface Media {
  id: string;
  url: string;
  type: string;
}

// 2. On ajoute les commentaires au Post
interface Post {
  id: string;
  content: string;
  author?: {
    username: string;
  };
  medias?: Media[];
  comments?: Comment[]; // <-- Ajout du tableau optionnel
}

export default function Home() {
  useSocket();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/posts`,
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Erreur lors du chargement des posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Flux d&apos;actualité
      </h1>

      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-6 bg-white border rounded-xl shadow-sm"
          >
            {/* En-tête et contenu du post */}
            <div className="font-semibold text-blue-600 mb-2">
              @{post.author?.username || "Anonyme"}
            </div>
            <p className="text-gray-700 whitespace-pre-wrap mb-4">
              {post.content}
            </p>

            {/* Zone des médias */}
            {post.medias && post.medias.length > 0 && (
              <div className="mt-4 grid gap-2">
                {post.medias.map((item) =>
                  item.type === "VIDEO" ? (
                    <video
                      key={item.id}
                      src={item.url}
                      controls
                      className="w-full rounded-lg max-h-96 object-cover bg-black"
                    />
                  ) : (
                    <Image
                      key={item.id}
                      src={item.url}
                      alt="Média du post"
                      width={800}
                      height={600}
                      className="w-full rounded-lg max-h-96 object-cover"
                      unoptimized={false}
                    />
                  ),
                )}
              </div>
            )}

            {/* Zone des commentaires */}
            {post.comments && post.comments.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
                {post.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-gray-50 p-3 rounded-lg text-sm"
                  >
                    <span className="font-semibold text-blue-600 mr-2">
                      @{comment.author?.username || "Anonyme"}
                    </span>
                    <span className="text-gray-700">{comment.content}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

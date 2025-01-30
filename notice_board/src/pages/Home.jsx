import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const posts = [
  "Post 1: Welcome to our platform!",
  "Post 2: Stay productive and take breaks!",
  "Post 3: Mental health matters!",
  "Post 4: Keep learning and growing!"
];

const Home = () => {
  const [currentPost, setCurrentPost] = useState(0);
  const [quote, setQuote] = useState("Loading...");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPost((prev) => (prev + 1) % posts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => setQuote(data.content))
      .catch(() => setQuote("Stay positive and keep pushing forward!"));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <motion.div
        key={currentPost}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="text-xl font-semibold text-center"
      >
        {posts[currentPost]}
      </motion.div>

      <Card className="p-4 text-center">
        <CardContent>
          <h2 className="text-lg font-bold">Work Hours</h2>
          <p>Monday - Friday: 9 AM - 5 PM</p>
          <p>Saturday - Sunday: Closed</p>
        </CardContent>
      </Card>

      <Card className="p-4 text-center">
        <CardContent>
          <h2 className="text-lg font-bold">Quote of the Day</h2>
          <p className="italic">"{quote}"</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;

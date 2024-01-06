import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { trpc } from "../trpc";

export const Component = () => {
  const navigate = useNavigate();
  const { mutate } = trpc.registration.verifyToken.useMutation({
    onSuccess: () => {
      navigate("/");
    },
  });

  const running = useRef(false);
  useEffect(() => {
    if (running.current) {
      navigate("/");
      return;
    }
    running.current = true;

    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");
    if (!token) {
      navigate("/");
      return;
    }
    mutate({ token });
  }, []);
};

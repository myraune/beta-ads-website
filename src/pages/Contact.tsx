import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ContactProps {
  t: any;
}

const Contact: React.FC<ContactProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/demo", { replace: true });
  }, [navigate]);

  return null;
};

export default Contact;

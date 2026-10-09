"use client";

export default function Footer() {
  return (
    <div className="secondary border-t primary-border-color flex justify-center p-3 md:p-3 z-10">
      © {new Date().getFullYear()}
    </div>
  );
}

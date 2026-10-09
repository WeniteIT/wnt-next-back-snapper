import { PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
  label?: string | React.ReactNode;
  info?: string | React.ReactNode;
  className?: string;
}

export default function BaseSection({
  children,
  label,
  info,
  className,
}: IProps) {
  return (
    <div
      className={`${className} flex flex-col gap-4 secondary-light rounded-lg p-2 md:p-4 md:shadow-lg secondary-border overflow-hidden`}
    >
      {(label || info) && (
        <div className="flex justify-between items-center text-normal">
          <div className="flex font-small">{label}</div>
          <div className="flex secondary-text-light">{info}</div>
        </div>
      )}
      <div className="flex gap-2 flex-col h-full">{children}</div>
    </div>
  );
}

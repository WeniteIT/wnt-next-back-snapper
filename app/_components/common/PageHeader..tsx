import { PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
  label: string | React.ReactNode;
  info?: string | React.ReactNode;
}

export default function PageHeader({ label, info }: IProps) {
  return (
    <div className="flex flex-col gap-4 secondary-light rounded-lg p-2 md:p-4 secondary-border flex-1 max-h-18">
      <div className="flex justify-between items-center text-small">
        <div className="flex font-bold">{label}</div>
        <div className="flex secondary-text-light">{info}</div>
      </div>
    </div>
  );
}

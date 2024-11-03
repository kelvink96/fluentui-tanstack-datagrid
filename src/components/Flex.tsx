import * as React from "react";

type PropType = {
  align?: React.CSSProperties["alignItems"];
  direction?: React.CSSProperties["flexDirection"];
  gap?: React.CSSProperties["gap"];
  justify?: React.CSSProperties["justifyContent"];
  wrap?: React.CSSProperties["flexWrap"];
  className?: string;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

export const Flex: React.FC<PropType> = (props) => {
  const {
    align,
    direction,
    gap,
    justify,
    children,
    wrap,
    className,
    style,
    ...others
  } = props;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: direction,
        alignItems: align ?? "center",
        gap: gap ?? "4px",
        justifyContent: justify ?? "flex-start",
        flexWrap: wrap ?? "wrap",
        ...style,
      }}
      {...others}
    >
      {children}
    </div>
  );
};

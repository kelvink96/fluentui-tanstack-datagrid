import {Image, Text} from "@fluentui/react-components";

import {Flex} from "./Flex.tsx";

import EmptyImage from "../assets/empty.svg";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    h?: React.CSSProperties["height"];
    w?: React.CSSProperties["width"];
    message?: string | React.ReactNode;
    hideLabel?: boolean;
};

export const Empty = (props: Props): JSX.Element => {
    const {h, w, message = "No data found", hideLabel, ...others} = props;

    const content =
        typeof message === "string" ? <Text>{message}.</Text> : message;

    return (
        <Flex
            direction="column"
            {...others}
        >
            <Image
                src={EmptyImage}
                fit="contain"
                style={{height: h ?? 80, width: w ?? 80}}
            />
            {!hideLabel && content}
        </Flex>
    );
};

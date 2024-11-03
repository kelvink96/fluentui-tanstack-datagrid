import moment from "moment";

/**
 * Convert date to readable date
 * @param isoString
 * @param withTime
 * @returns
 */
export const dateFormatter = (
    isoString: string,
    withTime?: boolean,
): string => {
    const d = moment(isoString);

    return withTime
        ? d.utc().format("DD-MM-YYYY HH:mm:ss").toString()
        : d.utc().format("DD-MM-YYYY").toString();
};
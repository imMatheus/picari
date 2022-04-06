import { Timestamp } from 'firebase/firestore';

export function getStartOfToday() {
	const now = new Date();

	// ✅ In UTC (international time standard)
	//          - keeps code consistent across time zones
	now.setUTCHours(0, 0, 0, 0); // start of the day

	// ✅ In Local Time (time zone the visitor's computer is in)
	//             - will differ for users with different GEOs
	// now.setHours(0, 0, 0, 0);
	const timestamp = Timestamp.fromDate(now); // convert to firestore timestamp
	return timestamp;
}

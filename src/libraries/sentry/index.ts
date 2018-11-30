import Sentry from 'sentry-expo';
import { SentrySeverity, SentryLog } from 'react-native-sentry'

// Remove this once Sentry is correctly setup.
Sentry.enableInExpoDevelopment = false;

Sentry.config('https://51d94392978644bb9ed16971b5c0324d@sentry.io/1315745', {
    handlePromiseRejection: true
}).install();

export { SentrySeverity, SentryLog }

export default Sentry
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
export default function TabBarIcon(props) {
    return (React.createElement(Ionicons, { name: props.name, size: 26, style: { marginBottom: -3 }, color: props.focused ? Colors.tabIconSelected : Colors.tabIconDefault }));
}
//# sourceMappingURL=TabBarIcon.js.map
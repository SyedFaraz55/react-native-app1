import React from 'react';
import { Text } from 'react-native';

export const H1 = ({ children, size, color, mt }) => {
    return <Text style={{ fontSize: size, color: color, marginBottom: mt }}>{children}</Text>
}

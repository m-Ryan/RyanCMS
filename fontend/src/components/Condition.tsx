import React from 'react';
interface ConditionProps {
	children: any;
	show?: boolean;
}

interface ConditionItemProps {
	children: any;
	show: boolean;
}
export function Condition(props: ConditionProps) {
	const { show = false, children } = props;
	return show ? children : null;
}

export function ConditionItem(props: ConditionItemProps) {
	const { show = true, children } = props;
	return show ? children : null;
}

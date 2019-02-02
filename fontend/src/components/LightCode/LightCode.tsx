import React from 'react';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
import 'highlight.js/styles/monokai.css';

interface Props {
	language: string;
	value: string;
}
export default class LightCode extends React.PureComponent<Props, null> {
	codeEl: any;
	constructor(props: Props) {
		super(props);
		this.setRef = this.setRef.bind(this);
	}

	setRef(el: any) {
		this.codeEl = el;
	}

	componentDidMount() {
		this.highlightCode();
	}

	componentDidUpdate() {
		this.highlightCode();
	}

	highlightCode() {
		hljs.highlightBlock(this.codeEl);
	}

	render() {
		return (
			<pre>
				<code ref={this.setRef} className={`language-${this.props.language}`}>
					{this.props.value}
				</code>
			</pre>
		);
	}
}

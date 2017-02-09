import React from 'react';
import ItemsTableCell from '../../components/ItemsTableCell';
import ItemsTableValue from '../../components/ItemsTableValue';

var Column = React.createClass({
	displayName: 'i18nTextColumn',
	propTypes: {
		col: React.PropTypes.object,
		data: React.PropTypes.object,
		linkTo: React.PropTypes.string,
	},
	getValue () {
		
		// cropping text is important for textarea, which uses this column
		var value = this.props.data.fields[this.props.col.path];

		var defaultLang = this.props.col.field.defaultLang ? this.props.col.field.defaultLang : this.props.col.field.langs[0]

		value = value[defaultLang]  // Object.keys(value)[0]
		
		return value ? value.substr(0, 100) : null;
	},
	render () {
		const value = this.getValue();
		const empty = !value && this.props.linkTo ? true : false;
		const className = this.props.col.field.monospace ? 'ItemList__value--monospace' : undefined;
		return (
			<ItemsTableCell>
				<ItemsTableValue className={className} to={this.props.linkTo} empty={empty} padded interior field={this.props.col.type}>
					{value}
				</ItemsTableValue>
			</ItemsTableCell>
		);
	},
});

module.exports = Column;
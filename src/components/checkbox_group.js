import React from 'react';

class CheckboxGroup extends React.Component {
    checkboxGroup() {
        let {label, required, options, input, meta} = this.props;

        return options.map((option, index) => {
            let inputId = `month-checkbox-${option.name}`
            return (
                <div className="checkbox" key={index}>
                    <span>
                        <input type="checkbox"
                            name={`${input.name}[${index}]`}
                            value={option.name}
                            checked={input.value.indexOf(option.name) !== -1}
                            id={inputId}
                            onChange={(event) => {
                                const newValue = [...input.value];
                                if (event.target.checked) {
                                    newValue.push(option.name);
                                } else {
                                    newValue.splice(newValue.indexOf(option.name), 1);
                                }

                                return input.onChange(newValue);
                            }}/>
                        <label class="label-inline" for={inputId}>{option.name}</label>
                    </span>
                </div>)
        });
    }

    render() {
        return (
            <div>
                {this.checkboxGroup()}
            </div>
        )
    }
}


export default CheckboxGroup;
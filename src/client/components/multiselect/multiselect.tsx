import * as React from 'react';
import { SyntheticEvent } from 'react';

export interface SelectOption {
  key: string;
  name: string;
  show: boolean;
}

export interface MultiSelectProps {
  options: SelectOption[];
  toggleOption: Function;
}

export interface MultiSelectState {
  isActive: boolean;
}

export class MultiSelect extends React.Component<
  MultiSelectProps,
  MultiSelectState
> {
  constructor(props: MultiSelectProps) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  componentDidMount() {
    document.addEventListener('click', () => this.closeDropdown());
  }

  componentWillUnmount() {
    document.removeEventListener('click', () => this.closeDropdown());
  }

  toggleDropdown(event: SyntheticEvent) {
    event.nativeEvent.stopImmediatePropagation();
    this.setState({ isActive: !this.state.isActive });
  }

  closeDropdown() {
    this.setState({ isActive: false });
  }

  toggleOption(event: SyntheticEvent, option: SelectOption) {
    event.nativeEvent.stopImmediatePropagation();
    const toggledOptionShow = !option.show;
    this.props.toggleOption({ ...option, show: toggledOptionShow });
  }

  render() {
    return (
      <div className={`dropdown ${this.state.isActive ? 'is-active' : ''}`}>
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={this.toggleDropdown.bind(this)}
          >
            <span>Dropdown button</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {this.props.options.map(
              (option: SelectOption, optionNum: number) => {
                return (
                  <a
                    className="dropdown-item inline"
                    key={optionNum}
                    onClick={event => this.toggleOption(event, option)}
                  >
                    {option.name}
                    <span
                      className="icon is-small is-pulled-right"
                      style={{ visibility: option.show ? 'visible' : 'hidden' }}
                    >
                      <i className="fas fa-check" />
                    </span>
                  </a>
                );
              },
            )}
          </div>
        </div>
      </div>
    );
  }
}

import * as React from 'react';

interface ISearchInputProps {
  isLoading: boolean;
  onSubmit: (query: string) => void;
  placeholder?: string;
  query?: string;
}

interface ISearchInputState {
  query: string;
}

class SearchInput extends React.PureComponent<ISearchInputProps, ISearchInputState> {
  constructor(props: ISearchInputProps) {
    super(props);

    this.state = { query: this.props.query || '' }
  }

  public render() {
    const { placeholder, isLoading } = this.props;
    const { query } = this.state;
    const isEmpty = query.length === 0;

    return(
      <div className="field has-addons is-rounded">
        <div className="control is-expanded has-icons-right">
          <input
            value={ query }
            placeholder={ placeholder }
            onChange={ this.onInputChange }
            onKeyPress={ this.onKeyPress }
            type="text"
            className="input"
          />
          <span className="icon is-small is-right">
            <i className="fas fa-search" />
          </span>
        </div>
        <div className="control">
          <button
            type="submit"
            disabled={ isLoading || isEmpty }
            onClick={ this.onButtonClick }
            className="button is-info"
            >
            Search
          </button>
        </div>
      </div>
    )
  }


  private onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget!.value;
    this.setState({ query: value })
  }

  private onKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.props.onSubmit(this.state.query);
    }
  }

  private onButtonClick = () => {
    this.props.onSubmit(this.state.query);
  }
}

export default SearchInput

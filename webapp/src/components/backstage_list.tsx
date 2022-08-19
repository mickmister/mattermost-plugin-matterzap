import React from 'react';

type Props = React.PropsWithChildren<{
    header: React.ReactNode;
    addLink?: string;
    addText?: React.ReactNode;
    addButtonId?: string;
    emptyText?: React.ReactNode;
    emptyTextSearch?: React.ReactNode;
    helpText?: React.ReactNode;
    loading: boolean;
    searchPlaceholder?: string;
}>

export default class BackstageList extends React.PureComponent<Props> {
    state = {
        filter: '',
    }

    updateFilter = (e) => {
        this.setState({
            filter: e.target.value,
        });
    }

    render() {
        const filter = this.state.filter.toLowerCase();

        let children;
        if (this.props.loading) {
            children = 'Loading';
            // children = <LoadingScreen/>;
        } else {
            children = this.props.children;
            let hasChildren = true;
            if (typeof children === 'function') {
                [children, hasChildren] = children(filter);
            }
            children = React.Children.map(children, (child) => {
                return React.cloneElement(child, {filter});
            });
            if (children.length === 0 || !hasChildren) {
                if (!filter) {
                    if (this.props.emptyText) {
                        children = (
                            <div className='backstage-list__item backstage-list__empty'>
                                {this.props.emptyText}
                            </div>
                        );
                    }
                } else if (this.props.emptyTextSearch) {
                    children = (
                        <div
                            className='backstage-list__item backstage-list__empty'
                            id='emptySearchResultsMessage'
                        >
                            {React.cloneElement(this.props.emptyTextSearch, {values: {searchTerm: filter}})}
                        </div>
                    );
                }
            }
        }

        let addLink = null;

        if (this.props.addLink && this.props.addText) {
            addLink = (
                <div>
                    {'Add Link'}
                </div>
                // <Link
                //     className='add-link'
                //     to={this.props.addLink}
                // >
                //     <button
                //         type='button'
                //         className='btn btn-primary'
                //         id={this.props.addButtonId}
                //     >
                //         <span>
                //             {this.props.addText}
                //         </span>
                //     </button>
                // </Link>
            );
        }

        return (
            <div className='backstage-content'>
                <div className='backstage-header'>
                    <h1>
                        {this.props.header}
                    </h1>
                    {addLink}
                </div>
                <div className='backstage-filters'>
                    <div className='backstage-filter__search'>
                        {/* <SearchIcon/> */}
                        <input
                            type='search'
                            className='form-control'
                            placeholder={this.props.searchPlaceholder}
                            value={this.state.filter}
                            onChange={this.updateFilter}
                            style={style.search}
                            id='searchInput'
                        />
                    </div>
                </div>
                <span className='backstage-list__help'>
                    {this.props.helpText}
                </span>
                <div className='backstage-list'>
                    {children}
                </div>
            </div>
        );
    }
}

const style = {
    search: {flexGrow: 0, flexShrink: 0},
};

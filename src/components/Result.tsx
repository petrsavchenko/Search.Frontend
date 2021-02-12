interface ILoadingPositions {
    positions: string | undefined | null,
    loading: boolean,
    error: boolean
}  

export interface ISearchResult {
    [searchEngine: string]: ILoadingPositions;
}

export const SearchResult = (props: ISearchResult) => {
    const items = [];

    for (const searchEngine in props) {
        const { loading, positions, error } = props[searchEngine];

        if (positions == null) {
            continue;
        }
        if (error) {
            items.push(<li key={searchEngine}><p>Oops - something went wrong with {searchEngine}. Please try again</p></li>);
            continue;
        }
        if (loading) {
            items.push(<li key={searchEngine}><h3>Hold on, fetching data via {searchEngine}...</h3></li>)
            continue;
        }
        if (!positions) {
            items.push(<li key={searchEngine}><h2>Sorry {searchEngine} was unable to find your keywords</h2></li>);
        } else {
            items.push(<li key={searchEngine}><h2>your keywords was found on {positions} place/s via {searchEngine}</h2></li>);
        }
    }

    return <ul>{items}</ul>;
};

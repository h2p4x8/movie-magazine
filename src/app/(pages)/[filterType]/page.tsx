import * as React from 'react';
export default function Page({ params }: { params: { filterType: string } }) {
    return <div>Filter Type: {params.filterType}</div>
}
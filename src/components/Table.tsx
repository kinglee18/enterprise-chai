import Image from 'next/image'
import React from 'react'

export interface TableProps {
  title: string
  columns: TableColumn[];
  data: TableRow[];
}
export interface TableColumn {
  key: string;
  title: string;
  width: string;
}
export interface TableRow {
  [key: string]: string | React.ReactNode;
}


export default function Table({
    title, 
    columns, 
    data,
    showSearch = false,
}: TableProps) {
    return (
        <div>
            {(title || showSearch) && (
                <div className='w-full flex justify-between items-center gap-4 pb-3 px-7'>
                    {title && (<p>{title}</p>)}
                    {showSearch && (
                        <div className="flex justify-around">
                            <div className='relative'>
                                <Image
                                    src={'/search.svg'}
                                    alt='search'
                                    width={16}
                                    height={16}
                                    className='absolute left-3 top-1/2 transform -translate-y-1/2'
                                />
                                <input type="search" placeholder='Type here...' className='hidden search-input pl-8 pr-4 mr-3.5 border border-gray-500'/>
                            </div>
                            <button className={'hidden'}>
                                <Image
                                    src={'/Settings.png'}
                                    alt='search'
                                    width={40}
                                    height={40}
                                />
                            </button>
                        </div> 
                    )}
                </div>
            )}
            <div className="w-full rounded-lg">
                <table className="w-full px-4 table-auto">
                    <thead>
                        <tr className="bg-darkViolet h-8 border-b border-gray-300 shadow-md">
                            {columns.map((column,index) => (
                                <th key={index} className={`${column.width} text-center px-3 py-2`}>{column.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 && (
                            <tr>
                                <td className="h-32 text-center" colSpan={columns.length}>No data available</td>
                            </tr>
                        )}
                        {data.map((row, index) => (
                            <tr key={index} className="h-9">
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex}
                                        className={`px-8 py-5 ${column.width}`}>{row[column.key]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

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


export default function Table({title, columns, data}: TableProps) {
    return (
        <div>
            <div className='w-full flex justify-between items-center gap-4 py-3 px-7'>
                <p>{title}</p>
                <div className="flex justify-around">
                    <div className='relative'>
                        <Image
                            src={'/search.svg'}
                            alt='search'
                            width={16}
                            height={16}
                            className='absolute left-3 top-1/2 transform -translate-y-1/2'
                        />
                        <input type="search" placeholder='Type here...' className='search-input pl-8  pr-4 mr-3.5'/>
                    </div>
                    <button>
                        <Image
                            src={'/Settings.png'}
                            alt='search'
                            width={40}
                            height={40}
                        />
                    </button>
                </div>
            </div>
            <div className="w-full">
                <table className="w-full px-4">
                    <thead>
                        <tr className=" bg-darkViolet h-8">
                            {columns.map((column,index) => (
                                <th key={index} className={`${column.width} text-left px-8`}>{column.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
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

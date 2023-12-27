'use client';

import { useDebouncedCallback } from 'use-debounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch= useDebouncedCallback((term: string)=> {
    // console.log(`Searching...${term}`)

    const params = new URLSearchParams(searchParams);
    params.set('page','1')
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
    // console.log(term);
  },300)

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
        // defaultValue대 value/ 통제됨 대 통제되지 않음
        // 상태를 사용하여 입력 값을 관리하는 경우 value속성을 사용하여 제어되는 구성 요소로 만듭니다. 이는 React가 입력 상태를 관리한다는 의미입니다.
        // 그러나 상태를 사용하지 않으므로 defaultValue. 이는 기본 입력이 자체 상태를 관리한다는 의미입니다. 상태 대신 URL에 검색어를 저장하므로 괜찮습니다.
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

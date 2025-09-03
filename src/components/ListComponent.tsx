import type { JSX } from 'react';

type ListComponentProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
};

function ListComponent<T>({ items, renderItem }: ListComponentProps<T>): JSX.Element {
  return <>{items.map((item, index) => renderItem(item, index))}</>;
}

export default ListComponent;

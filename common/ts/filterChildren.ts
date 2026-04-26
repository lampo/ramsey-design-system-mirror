import {
  ReactNode,
  Children,
  ReactPortal,
  ComponentType,
} from "react";

/**
 * Finds the first child that matches the given sub-component's `displayName` or `name` from the given `children`, `undefined` otherwise.
 * @param {(ReactNode|ReactNode[])} children - `props.children`
 * @param {ComponentType} subComponent - A React component
 * @returns {(ReactNode | ReactPortal)[] | undefined} The first matching sub-component or `undefined` if no sub-component was found
 */

type FilteredChildren = ReactNode | ReactPortal;

const filterChildren = (
  children: ReactNode | ReactNode[],
  subComponent: ComponentType<any>
): FilteredChildren[] | undefined =>
  Children.toArray(children).filter((child) => {
    const childWithType = child as FilteredChildren & {
      type?: { name?: string; displayName?: string };
    };
    return (
      (childWithType &&
        childWithType.type &&
        (childWithType.type.displayName || childWithType.type.name)) ===
      (subComponent.displayName || subComponent.name)
    );
  });

export default filterChildren;

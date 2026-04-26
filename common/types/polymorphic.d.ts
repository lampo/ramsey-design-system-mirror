import {
  ElementType,
  PropsWithChildren,
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
} from "react";

// Generic Types
type ElementProp<C extends ElementType> = { element?: C };

type GenericProps<C extends ElementType, Props = object> = Omit<
  ComponentPropsWithoutRef<C>,
  PropsToOmit<C, Props>
>;

type GenericPropsWithChildren<
  C extends ElementType,
  Props = object
> = PropsWithChildren<Props & ElementProp<C>> & GenericProps<C, Props>;

type GenericRef<C extends ElementType> = ComponentPropsWithRef<C>["ref"];

type GenericPropsWithRef<C extends ElementType, Props = object> = GenericProps<
  C,
  Props
> & { ref?: GenericRef<C> };

type GenericPropsWithRefAndChildren<
  C extends ElementType,
  Props = object
> = GenericPropsWithChildren<C, Props> & { ref?: GenericRef<C> };

type PropsToOmit<C extends ElementType, P> = keyof (ElementProp<C> & P);

export {
  type ElementProp,
  type GenericProps,
  type GenericPropsWithChildren,
  type GenericRef,
  type PropsToOmit,
  type GenericPropsWithRef,
  type GenericPropsWithRefAndChildren,
};

[#import "*/rds-config.ftl" as config]

[#--  Macros  --]

[#macro render element]
  [#if !isRenderable(element)][#return][/#if]
  [#local markup][#if element?is_directive][@element /][#else]${element}[/#if][/#local]
  [#local output][#nested markup /][/#local]
  [#t /]${output?has_content?then(output, markup)}
[/#macro]

[#macro svg
  iconHash
  title=""
  attributes={}
]
  [#compress]
    [#if iconHash.attributes?has_content]
      [#local attributes += iconHash.attributes]
    [/#if]

    [#local attributes += { "xmlns": "http://www.w3.org/2000/svg" }]

    <svg
      [#list attributes as name, value]
        ${name}="${value}"
      [/#list]
    >
      [#if title?has_content]<title>${title}</title>[/#if]

      [#if iconHash.children?has_content]${iconHash.children}[/#if]
    </svg>
  [/#compress]
[/#macro]

[#--  Functions  --]

[#function classNames classNameOptions...]
  [#local classNames = []]

  [#list classNameOptions as option]
    [#if option?is_hash]
      [#list option as className, condition]
        [#if condition]
          [#local classNames += [className]]
        [/#if]
      [/#list]
    [#elseif option?has_content]
      [#local classNames += [option]]
    [/#if]
  [/#list]

  [#return classNames]
[/#function]

[#function conditionalAttributes attributesHash]
  [#local attributes = {}]

  [#list attributesHash as key, conditions]
    [#list conditions as value, condition]
      [#if condition]
        [#local attributes += { key: value }]
      [/#if]
    [/#list]
  [/#list]

  [#return attributes]
[/#function]

[#function isRenderable arg]
  [#return arg?is_directive || arg?has_content]
[/#function]

[#function suffixRdsClasses classes suffix]
  [#local suffixedClasses = []]
  [#list classes as class]
    [#if class?starts_with("rds-")]
      [#local suffixedClasses += [class + suffix]]
    [#else]
      [#local suffixedClasses += [class]]
    [/#if]
  [/#list]

  [#return suffixedClasses]
[/#function]

[#function getIconHash iconName]
  [#if iconName?has_content && iconName != "default"]
    [#local spritePath = (config.iconSpriteDir?has_content)?then(config.iconSpriteDir, "/")]
    [#return {
      "children": '<use href="${spritePath}ramsey-icons.svg#icon-${iconName}" />',
      "attributes": {
        "viewBox": "0 0 24 24"
      }
    }]
  [/#if]

  [#return null]
[/#function]

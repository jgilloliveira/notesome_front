
type ColorPickerParams = {
  onClick: (color: string) => void
}
export function ColorPicker(props: ColorPickerParams){

  const colors = ["red", "blue", "green", "yellow", 
                  "orange", "purple", "gold", "silver", 
                  "cyan", "brown", "white", "grey", ]

  return (
    <div className="flex wrap flex-center full-size">
      { colors.map(color =>
          <button onClick={() => props.onClick(color)}
            style={{width: "60px", height: "60px", backgroundColor: color, margin: "4px", border: "1px solid black"}}
          />
        )
      }
    </div>
  )
}

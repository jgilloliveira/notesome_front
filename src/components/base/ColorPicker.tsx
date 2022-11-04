
export function ColorPicker(){

  const colors = new Array(12).fill("red")
  return (
    <div className="flex wrap flex-center full-size">

      { colors.map(color => <div style={{width: "60px", height: "60px", backgroundColor: "red", margin: "4px", border: "1px solid black"}}/>)}
    </div>
  )
}

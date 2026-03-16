import CaseItem from "./CaseItem"

type Case = {
  image: string
  title: string
}

type CaseListProps = {
  cases: Case[]
}

function CaseList({ cases }: CaseListProps) {
  return (
    <div>
      {cases.map((item, index) => (
        <CaseItem
          key={index}
          image={item.image}
          title={item.title}
        />
      ))}
    </div>
  )
}

export default CaseList;
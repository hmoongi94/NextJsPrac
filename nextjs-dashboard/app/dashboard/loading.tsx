// * loading.tsxSuspense를 기반으로 구축된 특별한 Next.js 파일로, 페이지 콘텐츠가 로드되는 동안 대체 UI로 표시할 폴백 UI를 생성할 수 있습니다.
// * 정적 이므로 <Sidebar>즉시 표시됩니다. 사용자는 <Sidebar>동적 콘텐츠가 로드되는 동안 상호 작용할 수 있습니다.
//* 사용자는 다른 페이지로 이동하기 전에 페이지 로드가 완료될 때까지 기다릴 필요가 없습니다(이를 중단 가능한 탐색이라고 함).
export default function Loading() {
  return <div>Loading...</div>;
}
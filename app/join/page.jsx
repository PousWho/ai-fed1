import { redirect } from 'next/navigation';

// По ТЗ primary CTA «Вступить в Федерацию» ведёт на /join/.
// Отдельной страницы вступления пока нет — перенаправляем на рабочую форму заявки.
// Когда появится полноценная страница вступления, заменить редирект на её контент.
export default function JoinPage() {
  redirect('/contacts?type=join');
}

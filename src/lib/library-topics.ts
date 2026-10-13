import type { ReferenceEntry } from './library';

export const SITUATIONS: Record<string, string> = {
  'Du lịch & đi lại': 'Chuẩn bị chuyến đi, hỏi đường, mua vé và xử lý thay đổi lịch trình.',
  'Khách sạn': 'Đặt phòng, nhận phòng và hỏi về dịch vụ trong thời gian lưu trú.',
  'Ăn uống': 'Gọi món, nói nhu cầu ăn uống và thanh toán tại quán.',
  'Mua sắm': 'Hỏi giá, thử đồ, so sánh lựa chọn và đổi trả.',
  'Công việc': 'Trao đổi với đồng nghiệp, hẹn lịch và đề nghị hỗ trợ.',
  'Làm quen & giao tiếp': 'Giới thiệu bản thân, chào hỏi và nhờ người khác nói rõ hơn.',
  'Gia đình & nhà ở': 'Nói về người thân, đồ vật và nơi bạn sống.',
  'Sinh hoạt & thời gian': 'Kể thói quen, lịch hẹn và hoạt động mỗi ngày.',
  'Sức khỏe & an toàn': 'Diễn đạt tình trạng của bạn, nhờ giúp đỡ và hiểu lời khuyên.',
  'Học tập & lập luận': 'Học ngôn ngữ, trình bày quan điểm và đọc thông tin có kiểm chứng.',
  'Từ nền tảng': 'Đại từ, số đếm và từ nối để ghép các câu đầu tiên.',
};
const wordGroups: Record<string, string[]> = {
  'Du lịch & đi lại': ['trip','ticket','station','left','right','straight','turn','arrive','departure','platform','delay','drive','car','bank','forecast','weather','cancel'],
  'Khách sạn': ['hotel','reservation','single room','available','check in','included','key','booking','stay'],
  'Ăn uống': ['water','rice','bread','milk','coffee','tea','chicken','apple','orange','egg','fish','food','menu','bill','sandwich','bowl','glass','bottle','breakfast','lunch','drink','hungry'],
  'Học tập & lập luận': ['book','a book','a pen','teacher','a teacher','a student','school','university','read','reading','study','sound','word','noun','sheep'],
  'Từ nền tảng': ['i','i am',"i'm",'you','he','she','it','we','they','my','your','his','her','their','this','that','these','those','what','who','where','when','which','whose','because','but','so','some','any','a lot of','enough','by','unless'],
  'Mua sắm': ['price','size','cheap','expensive','shirt','pound','try on','afford','refund','fee','cost','cheaper','bigger','better','option','choose','bag','red','blue','green','yellow','black','white','pink'],
  'Công việc': ['work','office','meeting','designer','colleague','deadline','client','proposal','report','remind','promise','suggest','request','schedule','confirm','reschedule','application','submit','attendance','postpone','desk','monitor','copy','process','deliver'],
  'Gia đình & nhà ở': ['family','mother','father','parent','brother','sister','son','daughter','grandmother','children','child','aunt','dog','home','at home','the bathroom','on the table','in the bag','this is my family','i am at home','where is my phone?','house','room','table','chair','door','window','bed','phone'],
  'Sức khỏe & an toàn': ['rest','medicine','tired','exhausted','helmet','rule','help','quiet','lonely'],
  'Làm quen & giao tiếp': ['hello','thanks','thank you','please','sorry','excuse me','goodbye','name','first name','last name','spell','slowly','again','English','a little','speak','Nice to meet you'.toLowerCase(),'my name is…','i am vietnamese','good morning','good evening','see you later'],
};
export function vocabularyTopics(word: string, slug: string, meaning = ''): string[] {
  if(word.toLowerCase()==='orange') return [meaning.includes('màu')?'Mua sắm':'Ăn uống'];
  if(/^[A-H]$/.test(word)) return ['Từ nền tảng'];
  const matches = Object.entries(wordGroups).filter(([,words]) => words.includes(word.toLowerCase())).map(([topic]) => topic);
  if(matches.length) return matches;
  if(/do-an|do-does/.test(slug)) return ['Ăn uống'];
  if(/mua-sam|so-sanh|mau-sac/.test(slug)) return ['Mua sắm'];
  if(/dat-phong/.test(slug)) return ['Khách sạn'];
  if(/duong-di|a2-did|dieu-kien-1/.test(slug)) return ['Du lịch & đi lại'];
  if(/^(a1-gia-dinh|gia-dinh|a1-nha-o|trong-nha)$/.test(slug)) return ['Gia đình & nhà ở'];
  if(/chao-hoi|cam-on|loi-moi|tin-nhan/.test(slug)) return ['Làm quen & giao tiếp'];
  if(/loi-khuyen/.test(slug)) return ['Sức khỏe & an toàn'];
  if(/toeic|thuong-luong|email|bi-dong/.test(slug)) return ['Công việc'];
  if(/ielts|b2|ipa/.test(slug)) return ['Học tập & lập luận'];
  if(/nen-tang|foundation|dai-tu|my-your|so-dem|cau-hoi-what/.test(slug)) return ['Từ nền tảng'];
  return ['Sinh hoạt & thời gian'];
}
// Original examples: situation, reusable chunk, meaning, use, example, translation.
const rows = [
 ['Du lịch & đi lại','a ticket to…','một vé đi…','Tại quầy vé: thêm tên nơi đến sau to.','I would like a ticket to Oxford, please.','Cho tôi mua một vé đi Oxford.'],
 ['Du lịch & đi lại','How do I get to…?','Đến… bằng cách nào?','Hỏi người địa phương đường đến một nơi.','How do I get to the train station?','Tôi đến ga tàu bằng cách nào?'],
 ['Du lịch & đi lại','Does this bus go to…?','Xe buýt này có đến… không?','Xác nhận tuyến trước khi lên xe.','Does this bus go to the airport?','Xe buýt này có đến sân bay không?'],
 ['Du lịch & đi lại','on the way','đang trên đường','Báo cho người đang đợi biết bạn sắp đến.','I am on the way to the station.','Tôi đang trên đường đến nhà ga.'],
 ['Khách sạn','I have a reservation under…','Tôi có đặt phòng dưới tên…','Nói với lễ tân khi nhận phòng; thêm tên người đặt.','I have a reservation under Linh Nguyen.','Tôi có đặt phòng dưới tên Linh Nguyen.'],
 ['Khách sạn','Is breakfast included?','Có bao gồm bữa sáng không?','Hỏi dịch vụ đã nằm trong giá phòng hay chưa.','Is breakfast included in the room rate?','Giá phòng có bao gồm bữa sáng không?'],
 ['Khách sạn','Could I check in…?','Tôi có thể nhận phòng… không?','Hỏi nhận phòng sớm; khách sạn có thể chưa có phòng trống.','Could I check in early?','Tôi có thể nhận phòng sớm không?'],
 ['Khách sạn','Could you help me with…?','Bạn giúp tôi về… được không?','Nhờ lễ tân xử lý một vấn đề cụ thể.','Could you help me with the Wi-Fi?','Bạn giúp tôi kết nối Wi-Fi được không?'],
 ['Ăn uống','I would like…','Tôi muốn…','Gọi món lịch sự; thêm món ăn hoặc đồ uống.','I would like a bowl of soup.','Tôi muốn một bát súp.'],
 ['Ăn uống','Could I have…?','Cho tôi… được không?','Xin thực đơn, nước uống hoặc hóa đơn.','Could I have the menu, please?','Cho tôi xem thực đơn được không?'],
 ['Ăn uống','without…','không có…','Yêu cầu bỏ một thành phần khỏi món.','Could I have this without onions?','Cho tôi món này không có hành được không?'],
 ['Ăn uống','Would you like…?','Bạn có muốn…?','Mời ai đó dùng món hoặc đồ uống.','Would you like some tea?','Bạn có muốn uống chút trà không?'],
 ['Mua sắm','How much is…?','… giá bao nhiêu?','Hỏi giá một món đồ.','How much is this shirt?','Chiếc áo này giá bao nhiêu?'],
 ['Mua sắm','try on','thử đồ','Xin phép thử quần áo trước khi mua.','Can I try this on?','Tôi thử món này được không?'],
 ['Mua sắm','Do you have…?','Bạn có… không?','Hỏi kích cỡ hoặc màu khác.','Do you have a smaller size?','Bạn có cỡ nhỏ hơn không?'],
 ['Mua sắm','just looking','chỉ xem thôi','Trả lời nhân viên khi chưa cần tư vấn.','I am just looking, thank you.','Tôi chỉ xem thôi, cảm ơn.'],
 ['Công việc','take a break','nghỉ một lát','Đề nghị nghỉ ngắn trong lúc làm việc.','Let’s take a break.','Chúng ta nghỉ một lát nhé.'],
 ['Công việc','Would it be possible to…?','Có thể… được không?','Đề nghị thay đổi một cách lịch sự.','Would it be possible to extend the deadline?','Có thể gia hạn thời hạn không?'],
 ['Công việc','Could you send me…?','Bạn gửi cho tôi… được không?','Nhờ đồng nghiệp gửi tài liệu cụ thể.','Could you send me the report?','Bạn gửi cho tôi báo cáo được không?'],
 ['Công việc','In my view,…','Theo quan điểm của tôi,…','Nêu quan điểm trong trao đổi, kèm lý do nếu có.','In my view, we need more time.','Theo tôi, chúng ta cần thêm thời gian.'],
 ['Làm quen & giao tiếp','a little','một chút','Nói mức độ bạn biết một ngôn ngữ.','I speak a little English.','Tôi nói được một chút tiếng Anh.'],
 ['Làm quen & giao tiếp','Could you say that again?','Bạn nói lại được không?','Khi chưa nghe rõ câu vừa nói.','Could you say that again, please?','Bạn vui lòng nói lại được không?'],
 ['Làm quen & giao tiếp','Nice to meet you.','Rất vui được gặp bạn.','Chào người mới gặp lần đầu.','Nice to meet you. My name is Linh.','Rất vui được gặp bạn. Tôi tên là Linh.'],
 ['Làm quen & giao tiếp','Could you speak more slowly?','Bạn nói chậm hơn được không?','Khi người đối diện nói quá nhanh.','Could you speak more slowly, please?','Bạn vui lòng nói chậm hơn được không?'],
];
export const SITUATION_PHRASES: ReferenceEntry[] = rows.map(([topic,title,description,context,en,vi],i) => ({id:`situation-phrase-${i}`,topic,title,description,context,en,vi,level: i===17?'B2':i===19?'B1':topic==='Khách sạn'?'A2':'A1',tip:'Thử thay nơi đến, món ăn hoặc thông tin trong câu bằng điều bạn muốn nói.'}));
export const SITUATION_SENTENCES: ReferenceEntry[] = SITUATION_PHRASES.map(e=>({...e,id:e.id.replace('phrase','sentence'),title:e.en!,description:e.vi!}));

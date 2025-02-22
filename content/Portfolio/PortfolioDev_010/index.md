---
emoji: ''
title: DEV 10. WORKS 작업 진행
date: '2024-11-07 12:30:00'
author: JunHyeong Moon
tags: 
categories: DEV-PORTFOLIO
---

> 태그 선택에 따라 리스트가 변경 되도록 작업했으며,  
> 임시 모달 페이지까지 생성하였습니다.

---

## 태그별 분류 설정

이제 기존에 제작한 태그 선택 버튼에 따라 작업물을 분류하도록 작업을 진행하겠습니다.

기존에는 메인 태그인 Tech, Art, Document 3가지를 id로 구분하여 css 내에서 display설정을 해주려고 했습니다.  
다만 전체적으로 매우 복잡해지는 상황이라, 기존에 있던 `const [now, ChangeTag] = useState(0);` 에 생성한 `num`변수를 그대로 사용해서 css 스타일을 ID를 사용해서 `#tagEnable` `#tagDisable` 두 개로 적용하고자 합니다.

해당 방법은 태그 설정이 복잡해보이는 단점이 있어 function으로 제작하려했으나, 아직은 어렵게 느껴저 현재 방법으로 진행하고, 추후 수정을 하려합니다.

```jsx
// src/app/works/works.js

<div id={now === 0 || now === 1 ? styles.tagEnable : styles.tagDisable} className={styles.workItem}>
    <div className={styles.workThumbnail}>
        <div className={styles.workHover}>
            <p className={styles.workMore}>자세히보기</p>
        </div>
        <Image 
            src={"/images/works/test/TestThumbnail.jpg"} 
            fill
            alt='test-thumbnail'
            sizes='width: 100%'
            style={{objectFit: "cover"}} />
    </div>
    <div className={styles.workText}>
        <h3 className={styles.workTitle}>작업 제목 01</h3>
        <p className={styles.workSub}>작업 내용을 한 줄 정도로 간단하게 적습니다.</p>
    </div>
    <div className={styles.workTags}>
        <p className={styles.workTagButton}>Tech</p>
        <p className={styles.workTagButton}>Unreal Engine</p>
    </div>
</div>
```
```css
/* src/app/works/works.module.css */

.workItem {
	/* display: flex; 부분 삭제*/
}

#tagEnable.workItem {
    display: flex;
}

#tagDisable.workItem {
    display: none;
}
```

---

## 작업물 모달 페이지

이제 "자세히보기" 버튼을 눌렀을 때 페이지 모달이 뜨도록 제작해야합니다.  
관련 내용을 찾아보니 Nextjs에서 제공하는 라우터 기능으로 모달창을 띄울 수 있다는 것을 알았습니다.  
이 방법으로 진행할 경우 URL 구조로도 남아, 뒤로가기 기능이 가능하다고 합니다.  
화면을 꽉 채우는 모달 창의 경우 뒤로가기로 뒤로 돌아가는 것이 더 좋다고 생각하기에 해당 방법을 통해 모달창의 기본 구조를 만들어보겠습니다.

### 라우팅 관련 문제

라우팅을 사용해 모달을 제작하는 부분에서 계속해서 막히고 있습니다.  
일단 파일 구조부터 시작해서, 모달을 어떻게 구성하고 연결하는지는 찾았지만, 코드로 적용했을 때 오류가 계속해서 발생합니다.

``Warning: Cannot update a component (`HotReload`) while rendering a different component (`Router`). To locate the bad setState() call inside `Router`, follow the stack trace as described in``

이런 오류가 계속 발생해서, 원인을 찾고 있습니다.

### 문제 해결

> 계속 인터넷을 뒤져보면서 이것저것 수정을 하니 사라졌습니다.  
> 허나 해당 과정을 다시 다 뒤로 돌려 예전과 같은 상황을 만들었음에도 같은 문제가 다시 발생하지 않았습니다.  
> 
> 어떤걸 어떻게 해결했는지, 정확히 파악은 되지 않았으나 같은 상황에서 지금은 잘 되는 것을 보면, 캐시나 임시파일 관련 오류도 있지 않았을까 생각합니다.  
> 
> 일단 진행했던 작업 해결 과정은 모두 적어보겠습니다.

상단 해당 문제는 [레딧](https://www.reddit.com/r/nextjs/comments/15t76dj/parallel_routes_and_interception_issues/?rdt=53592) 자료의 도움을 받아 `.next` 폴더를 삭제하고 다시 시작했습니다.

해당 작업을 진행하니, 메인 페이지부터 404에러가 뜨는 모습이었습니다.  
`layout.js`에서 `{modal}` 부분을 지웠을 때 정상적으로 나오는 것을 보고, 모달 관련 문제인 것을 파악했습니다.

해당 문제는 다음 과정들을 수행하면서 사라졌습니다.
1. 파일명 변경 (동적 -> 정적 라우팅)
2. `default.js` 파일 이동
3. 컴포넌트 함수명 숫자 제외 (`Work01` -> `WorkTest`)
4. PC 재부팅

해결 과정입니다.  
처음 파일을 생성했을 때 다음과 같은 구조였습니다.

```
D:\JUNYANGYEE_FILES\JUNHYEONG_WEB\JUNHYEONG-PORTFOLIO\SRC\APP
│
├─ @modal
│  └─ (.)portfolio
|     |  default.js
│     └─ [id]
│             page.js
│             page.module.css
│
├─portfolio
│  │  default.js
│  │
│  └─ [id]
│          page.js
|
│  layout.js
│  page.js
```

해당 부분에서 폴더명 문제가 있음을 파악했습니다.  
폴더명이 `[id]`로 중괄호가 쌓여있다고 해도 id 링크로 연결될 줄 알았으나, 찾아보니 해당 폴더명은 동적 라우팅 폴더명이었습니다. 즉, `/id` 같은 형태가 아닌 변수로 링크를 연동하는 폴더명이었습니다.  
해당 부분을 `testPage`로 변경하였습니다. 추후 작업물이 많아질 때 동적 라우팅으로 변경하는 방향도 생각 중입니다.

그리고 `@modal/(.)portfolio` 에 들어가있는 `default.js` 파일을 한 단계 더 상위단계로 옮겨 `@modal/default.js`의 구조로 제작했습니다.  
다시 파일을 하위 단계로 넣었을 때 404 오류가 다시 발생하는 것을 보니, 해당 파일이 메인페이지 404 오류의 문제였던 것 같습니다.

### 모달 페이지 창 띄우기까지

세부 페이지 디자인은 아직 진행하지 않아, 가운데에 창을 띄우는 정도만 만들어두겠습니다.

아래 부분을 만족해야합니다.
- 스크롤은 내부에서만 (외부 부분 스크롤 안되게)
- 뒷 배경은 움직이지 않는다. 
  (현재 아무런 설정 없이 텍스트만 넣고 테스트해본 결과, 왔다갔다 하면서 배경이 따라 움직입니다.)

뒷 배경이 움직이는 건 [비슷한 문제를 해결한 블로그](https://velog.io/@jihwan1211/Next.js-%EB%AA%A8%EB%8B%AC-%EB%92%B7%EB%B0%B0%EA%B2%BD-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EC%9C%84%EC%B9%98-%EC%9C%A0%EC%A7%80%ED%95%98%EA%B8%B0-intercepting-Routes-parallel-Routes)를 통해 도움을 받았습니다.
`<Link scroll={false} />`

스크롤의 경우, [해당 블로그](https://ryurim.tistory.com/154)에서 찾았습니다.  
다만 코드의 설명이 없어서, 제가 확인하면서 이해한 것을 바탕으로 정리해보겠습니다.

```jsx
const scrollCont = useEffect(() => {
    // 문서의 body 스타일에 cssText라는 클래스를 추가합니다.
    document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
	/* 
	위치는 fixed로 고정하며, 
	overflow-y를 스크롤로 생성해 스크롤이 가능하게 합니다.
	스크롤을 내리는 만큼 top을 계속해서 조절합니다.
	*/
	
    return () => {
	    // scrollY 익명변수에 지금까지 문서가 스크롤되었던 top 값을 저장합니다.
        const scrollY = document.body.style.top;
        // 기존에 추가했던 cssText 클래스를 제거합니다.
        document.body.style.cssText = "";
        /*
        parseInt (string, radix);
        string : 숫자로 변환할 문자열
        radix : (optional) 문자열을 읽을 진법

        scrollY 혹은 "0" 에 담긴 숫자를 읽은 후, 값을 반전하여 해당 위치.
        즉, 기존 스크롤이 되었던 위치로 되돌립니다.
        */
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
}, []);
```

외부 스크롤은 막혔고, 내부에서만 스크롤이 가능하게 내부 부분에만 `overflow-y: auto;`를 적용했습니다. 뒷 배경과 모달 안쪽 컨텐츠는 `z-index` 를 바탕으로 구분하였습니다.  
추가로 모달 바깥쪽 배경 클릭시 자동으로 뒤로가기가 되도록 `{ useRouter }`를 이용했습니다.

```jsx
// src/app/works/works.js

const scrollCont = useEffect(() => {
    document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
    return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
}, []);

...
		<div 
		id={now === 0 || now === 3 ? styles.tagEnable : styles.tagDisable} 
		className={styles.workItem}>
		    <div className={styles.workThumbnail}>
		        <div className={styles.workHover}>
		            <Link href="/portfolio/id" className={styles.workMore}
		             scroll={false} onClick={scrollCont}>자세히보기</Link>
		        </div>
		        ...
		    </div>
		</div>


// default.js

export default function Default() {
    return null;
}


// src/app/@modal/(.)portfolio/testPage/page.js

'use client'
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function WorkTest() {
    const router = useRouter();

    return (
        <section className={styles.modalPage}>
            <div className={styles.innerContainer}>
                <div className={styles.thumbnail}>
                    
                </div>
            </div>

            <section className={styles.modalBack} 
            onClick={() => router.back()}>
            </section>
        </section>
    );
}
```
```css
/* src/app/@modal/(.)portfolio/testPage/page.module.css */

.modalPage {
    width: 100%;
    height: 100%;

    display: block;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;

    padding: 3.5rem 10rem;

    overflow-y: auto;
    box-sizing: border-box;
}

.innerContainer {
    width: 100%;
    height: 2000px;
    margin: 0 auto;
    background-color: #FFFFFF;
}

.modalBack {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    background-color: #000000bf;
    backdrop-filter: blur(15px);
}
```


---

## Works 코드 정리

현재 작성된 아래 부분은 작업물 썸네일 부분입니다.

```jsx
// src/app/works/works.js
// Work List 작업물 썸네일 구조

<div id={now === 0 || now === 3 ? styles.tagEnable : styles.tagDisable} className={styles.workItem}>
    <div className={styles.workThumbnail}>
        <div className={styles.workHover}>
            <Link href="/portfolio/testPage" className={styles.workMore} scroll={false} onClick={scrollCont}>자세히보기</Link>
        </div>
        <Image 
            src={"/images/works/test/TestThumbnail.jpg"} 
            fill
            alt='test-thumbnail'
            sizes='width: 100%'
            style={{objectFit: "cover"}} />
    </div>
    <div className={styles.workText}>
        <h3 className={styles.workTitle}>작업 제목 03</h3>
        <p className={styles.workSub}>작업 내용을 한 줄 정도로 간단하게 적습니다.</p>
    </div>
    <div className={styles.workTags}>
        <p className={styles.workTagButton}>Document</p>
        <p className={styles.workTagButton}>Unreal Engine</p>
        <p className={styles.workTagButton}>Substance Painter</p>
    </div>
</div>
```

작업물이 늘어날수록 `/src/app/works/works.js` 파일에 비슷한 부분이 무수히 많아지는 문제가 발생할 수 있고, 추후 수정이 어려워질 수 있기에 해당부분을 `WorksItem` 컴포넌트로 분리하여 제작하는 방향으로 진행해보겠습니다.

### 데이터 구조체 설정정

먼저 테스트용으로 사용할 변수들을 구조체로 (인터페이스로?) 설정해주겠습니다.  
추후 `.json` 혹은 다른 파일형태로 저장하겠지만, 일단 `works.js` 에 선언하겠습니다.

```jsx
// src/app/works/works.js

const info = {
    index: 1,
    tagNum: 3,
    thumbnail: "/images/works/test/TestThumbnail.jpg",
    alt: "alt_test",
    title: "안녕하세요",
    sub: "반갑습니다. 테스트입니다.",
    tags: ["Document", "Obsidian"],
    url: "/portfolio/testPage"
}
```

- `index`: `map`함수에서 키로 사용할 변수
- `tagNum`: 메인태그 ("tech", "art", "document") 숫자
- `thunbnail`: 작업물 썸네일
- `alt`: 작업물 썸네일 alt
- `title`: 작업 제목
- `sub`: 작업 설명
- `tags`: 배열 형태로, 작업물 관련 태그들.
- `url`: 모달 페이지 링크

### useState 변수 숫자에서 텍스트로

현재 이 부분에서 `tagNum` 이 숫자로 되어있어 `index`와 혼동이 되기도 쉽고, 이 구조체가 어떤 카테고리인지 확인이 어렵기에 이 부분을 텍스트 변수로 바꿔주겠습니다.

기존에 `useState` 관련해서 텍스트를 어떻게 해야할지 몰라 숫자로 해서 진행했었습니다.  
하지만, 다시 단순하게 생각해보니

`const [now, changeTag] = useState("all");`

`<div onClick={() => changeTag("art")} />`

위와 같은 형태로 사용하면 된다는 것을 파악했습니다. 해당 형태로 전부 변경해주겠습니다.

> *기존에는 너무 어렵게 생각해 `changeTag`부분 함수가 어떤 느낌인지 몰라 해메었는데, 단순하게 생각하고 단순하게 테스트해보니 너무 어렵게 생각하고 있었구나 느꼈습니다.  
> 앞으로는 조금 더 단순하게 생각하는 것도 좋을 것 같습니다.*

### workItem.js - props 데이터 받아오기

생성한 `workItem.js`에 상단 코드 및 관련 부분들을 옮겨 작성했습니다.  
코드 구조 상, `works.js`에서 사용한 데이터를 하위 컴포넌트에서 사용해야했기에, 아래래 형태로 `props` 로 데이터를 받아오는 형식으로 작성했습니다.

```jsx
// 부모 요소
<WorkItem info={info} now={now} />

// 하위 요소
export default function WorkItem(props) { 
	const info = props.info;
	const now = props.now;
	
	return ( ... )
}
```

### tags.map()

`info` 구조체에 포함된 `tags` 배열을 갯수만큼 반복해서 표시해야했습니다.  
처음에는 `for` 를 사용해서 반복문을 돌리려했으나, 관련해서 검색해보니 `map()` 함수를 주로 사용한다는 것을 확인했습니다.

`function`으로 태그를 작성해주는 함수를 제작하여 사용했습니다.

```jsx
// src/components/workItem/workItem.js

export default function WorkItem(props) { 
    function tagSetting(tags) {
        return (
            tags.map((tag, index) => 
                <p key={index} className={styles.workTagButton}>{tag}</p>
            )
        )
    }
	
    return ( 
	    ...
        <div className={styles.workTags}>
            {tagSetting(info.tags, info.index)}
        </div>
        ...
     )
}
```


### json 파일로 관리

상단에서 언급했듯 현재 `const info = { ... }`로 선언된 구조체 데이터를 `.json`파일로 옮겨서 수정하겠습니다.

해당 방식으로 할 경우, 데이터 관리의 편리함과, 코드 구성의 간편함이 장점일 것 같습니다.  
`src/app/works/works.json` 경로 파일을 생성해 해당 부분에서 관리하겠습니다.

`works.js`에서 해당 파일을 임포트해서 `map()` 함수로 사용해보도록 하겠습니다.  
일단 `works.json` 파일은 아래 구조로 작성하였습니다.

```json
// src/app/works/works.json

{
    "works": [
		{
			"index": 1,
			"tagNum": "doc",
			"thumbnail": "/images/works/test/TestThumbnail.jpg",
			"alt": "alt_test",
			"title": "도큐먼트 제목",
			"sub": "반갑습니다. 테스트입니다. Doc",
			"tags": ["Document", "Obsidian"],
			"url": "/portfolio/testPage"
		},

		{
			"index": 2,
			"tagNum": "tech",
			"thumbnail": "/images/works/test/TestThumbnail.jpg",
			"alt": "alt_test",
			"title": "테크 제목",
			"sub": "반갑습니다. 테스트입니다. Tech",
			"tags": ["Tech", "Unreal Engine"],
			"url": "/portfolio/testPage"
		}
	]
}
```

`"works"`라는 배열로 정의해서, `works.js` 파일에서 반복을 통해 순서대로 아이템을 작성하게 하도록 했습니다.  
이제 json 파일 하나로 리스트를 컨트롤 할 수 있게 되었습니다.

```jsx
// src/app/works/works.json

export default function Works() {

    function dataDraw(workData, now) {
        return (
            workData.works.map((work) => 
                <WorkItem 
                    key={work.index}
                    info={work}
                    now={now}
                />
            )
        )
    }
    
    ...
	
    <section className={styles.workList}>
        {dataDraw(workData, now)}
    </section>
	
    ...
}
```


### 메인태그 중첩

작업 특성상 메인태그가 Tech, Art 두가지 모두를 적용해야할 때가 있습니다.  
이를 위해서, tagNum을 여러개를 적용할 수 있도록 배열로 설정하였습니다.  
이름도 이제는 `"mainTag"`로 작성하였습니다.

```json
// src/app/works/works.json

{
    "works": [
		{
			"index": 1,
			"mainTag": ["tech", "art"],
			"thumbnail": "/images/works/test/TestThumbnail.jpg",
			"alt": "alt_test",
			"title": "도큐먼트 제목 01",
			"sub": "반갑습니다. 테스트입니다.",
			"tags": ["Tech", "Art", "Unreal Engine"],
			"url": "/portfolio/testPage"
		}
    ]
}
```

해당 변수를 적용할 수 있도록 `workItem.js` 컴포넌트를 수정하였습니다.  
map 함수로 현재 선택된 태그와, 작업물의 메인태그를 비교 후 `ture/false` 값을 반환하도록 했습니다.

```jsx
// src/components/workItem/workItem.js

function tagCheck(now, mainTag) {
    let result = false;
    mainTag.map((tag) => {
            if (now == "all") {
                result = true;
            }
            if (now == tag) {
                result = true;
            }
        }
    )

    return result;
}

return (
    <div id={tagCheck(now, info.mainTag) ? ... : ...} />
)
```


---

## 최종 형태

최종적으로 코드가 아래 형태로 수정되었습니다.

```json
// src/app/works/works.json

{
    "works": [
		{
			"index": 1,
			"mainTag": ["tech", "art"],
			"thumbnail": "/images/works/test/TestThumbnail.jpg",
			"alt": "alt_test",
			"title": "도큐먼트 제목 01",
			"sub": "반갑습니다. 테스트입니다.",
			"tags": ["Tech", "Art", "Unreal Engine"],
			"url": "/portfolio/testPage"
		},

		{
			"index": 2,
			"mainTag": ["art"],
			"thumbnail": "/images/works/test/TestThumbnail.jpg",
			"alt": "alt_test",
			"title": "도큐먼트 제목 02",
			"sub": "반갑습니다. 테스트입니다.",
			"tags": ["Art", "Photoshop", "MAYA"],
			"url": "/portfolio/testPage"
		},
		
		...
	]
}
```
```jsx
// src/app/works/works.js

'use client'
import { useState } from 'react';
import styles from "./works.module.css";
import WorkItem from "@/components/workItem/workItem";
import workData from "./works.json";

export default function Works() {
    const [now, changeTag] = useState("all");

    function dataDraw(workData, now) {
        return (
            workData.works.map((work) => 
                <WorkItem 
                    key={work.index}
                    info={work}
                    now={now}
                />
            )
        )
    }

    return (
        <section id="works" className={styles.works}>
            <div className={styles.innerPadding}>

                <h1 className={styles.title}>WORKS</h1>

                <div className={styles.tagSelect}>
                    <div onClick={() => changeTag("all")}
                        className={`${styles.button} ${now === "all" ? styles.active : styles.none}`} 
                        name="all">All
                    </div>
                    <div onClick={() => changeTag("tech")} 
                        className={`${styles.button} ${now === "tech" ? styles.active : styles.none}`} 
                        name="tech">Tech
                    </div>
                    <div onClick={() => changeTag("art")} 
                        className={`${styles.button} ${now === "art" ? styles.active : styles.none}`} 
                        name="art">Art
                    </div>
                    <div onClick={() => changeTag("doc")} 
                        className={`${styles.button} ${now === "doc" ? styles.active : styles.none}`} 
                        name="doc">Document
                    </div>
                </div>

                <section className={styles.workList}>
                    {dataDraw(workData, now)}
                </section>

            </div>
        </section>
    )
}
```

```jsx
// src/components/workItem/workItem.js

import { useEffect } from "react";
import Link from 'next/link';
import Image from "next/image";
import styles from "./workItem.module.css";

export default function WorkItem(props) {

    const now = props.now;
    const info = props.info;

    const scrollCont = useEffect(() => {
        document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
        return () => {
          const scrollY = document.body.style.top;
          document.body.style.cssText = "";
          window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
        };
    }, []);

    function tagSetting(tags) {
        return (
            tags.map((tag, index) => 
                <p key={index} className={styles.workTagButton}>{tag}</p>
            )
        )
    }

    function tagCheck(now, mainTag) {
        let result = false;
        mainTag.map((tag) => {
                if (now == "all") {
                    result = true;
                }
                if (now == tag) {
                    result = true;
                }
            }
        )

        return result;
    }

    return (
        <div id={tagCheck(now, info.mainTag) ? styles.tagEnable : styles.tagDisable} className={styles.workItem}>
            <div className={styles.workThumbnail}>
                <div className={styles.workHover}>
                    <Link href={info.url} className={styles.workMore} scroll={false} onClick={scrollCont}>자세히보기</Link>
                </div>
                <Image 
                    src={info.thumbnail} 
                    fill
                    alt={info.alt}
                    sizes='width: 100%'
                    style={{objectFit: "cover"}} />
            </div>
            <div className={styles.workText}>
                <h3 className={styles.workTitle}>{info.title}</h3>
                <p className={styles.workSub}>{info.sub}</p>
            </div>
            <div className={styles.workTags}>
                {tagSetting(info.tags, info.index)}
            </div>
        </div>
    );
}
```

![Dev10_001_ListModal](Dev10_001_ListModal.gif)


---


```toc
```
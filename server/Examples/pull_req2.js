htmlData = `<p>Added Readme</p>

<hr>

<h4>You can view, comment on, or merge this pull request online at:</h4>
<p>&nbsp;&nbsp;<a href='https://github.com/rahul81/Market_Analysis/pull/1'>https://github.com/rahul81/Market_Analysis/pull/1</a></p>

<h4>Commit Summary</h4>
<ul>
  <li>Create README.md</li>
</ul>

<h4>File Changes</h4>
<ul>
  <li>
    <strong>A</strong>
    <a href="https://github.com/rahul81/Market_Analysis/pull/1/files#diff-04c6e90faac2675aa89e2176d2eec7d8">README.md</a>
    (2)
  </li>
</ul>

<h4>Patch Links:</h4>
<ul>
  <li><a href='https://github.com/rahul81/Market_Analysis/pull/1.patch'>https://github.com/rahul81/Market_Analysis/pull/1.patch</a></li>
  <li><a href='https://github.com/rahul81/Market_Analysis/pull/1.diff'>https://github.com/rahul81/Market_Analysis/pull/1.diff</a></li>
</ul>

<p style="font-size:small;-webkit-text-size-adjust:none;color:#666;">&mdash;<br />You are receiving this because you are subscribed to this thread.<br />Reply to this email directly, <a href="https://github.com/rahul81/Market_Analysis/pull/1">view it on GitHub</a>, or <a href="https://github.com/notifications/unsubscribe-auth/AN2BDH4SX3PGNSJQUHCGACDR77FNRANCNFSM4PZ2MGLQ">unsubscribe</a>.<img src="https://github.com/notifications/beacon/AN2BDH7BCUSB342DBZF6QCTR77FNRA5CNFSM4PZ2MGL2YY3PNVWWK3TUL52HS4DFUVEXG43VMWVGG33NNVSW45C7NFSM4KCLRYUA.gif" height="1" width="1" alt="" /></p>
<script type="application/ld+json">[
{
"@context": "http://schema.org",
"@type": "EmailMessage",
"potentialAction": {
"@type": "ViewAction",
"target": "https://github.com/rahul81/Market_Analysis/pull/1",
"url": "https://github.com/rahul81/Market_Analysis/pull/1",
"name": "View Pull Request"
},
"description": "View this Pull Request on GitHub",
"publisher": {
"@type": "Organization",
"name": "GitHub",
"url": "https://github.com"
}
}
]</script>`

var jsonData = {
    from: [{ name: "Rahul Das", address: "noreply@github.com"}],
    content: htmlData,
    contentType : 'text/html',
    subject: "[rahul81/Market_Analysis] Create README.md (#1)",
  };

var output = JSON.stringify(jsonData)

var expectedData = { data:
  { type: 'pull request',
    org: 'rahul81',
    repo: 'Market_Analysis',
    repo_link: 'https://github.com/rahul81/Market_Analysis/pull/1',
    patch_links:
     [ 'https://github.com/rahul81/Market_Analysis/pull/1.patch',
       'https://github.com/rahul81/Market_Analysis/pull/1.diff' ],
    from: 'github' },
 error: null }

module.exports = {output,expectedData}

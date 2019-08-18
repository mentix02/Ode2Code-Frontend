import React, { Component } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import CodeBlock from "../../components/Code";
import SeriesList from "../../components/SeriesList";

const code = `#include <stdio.h>
int main(void) {
  int arr[5] = {3, 2, 4, 1, 7};
  for(int i = 0; i < 5; i++) {
    printf("%d ", arr[i]);
  }
}`;

class Algorithms extends Component {

  render() {

    document.title = 'Algorithms';

    return (
      <div>
        <Jumbotron>
          <Container>
            <h1 className="display-4">Algorithms</h1>
            <hr/>
            <div>
              <blockquote className="blockquote">
                <p className="mb-0">
                  A process or set of rules to be followed in calculations or other problem-solving operations, especially by a computer.
                </p>
                <footer className="blockquote-footer">
                  <cite title="https://www.google.com/search?q=define+algorithm">Google</cite>
                </footer>
              </blockquote>
            </div>
            <p>
              I'm going to be honest - I'm not all that experienced in this topic - hell, I probably won't be able to derive the asymptotic time complexity
              of a linear search algorithm if it was right in front of me without wracking my head for hours. That's an exaggeration but I'm still just a
              student and if you're like me who still isn't clear on the definition of "asymptotic", don't worry. I'll try to explain it in the simplest of terms.
            </p>
            <div>
              <p>
                But not any more simpler. This is also a topic that goes hand in hand with data structures as a lot of the algorithms need to work on
                specialized data formats - like traversing a linked list - it's not as easy as -
              </p>
              <CodeBlock language='cpp' value={code} />
            </div>
            <p>
              But don't worry. We'll get into all the nuts and bolts of it but first - a prerequisite to <b>any</b> algorithms course is familiarity with ANY
              programming language. When I was first writing the tutorials for this topic, I wanted to do it in <code>pseudocode</code> but that's boring.
              Why not already use an existing language for which there's multiple interpreters / compilers for already. But at the same time, I didn't want to
              use a high level language (<code>Python</code>, <code>Javascript</code> or even <code>C++</code>) because most of them have a lot of algorithms
              already built in.
            </p>
            <p>
              With that, I hope you enjoy brushing up on your algorithms with me.
            </p>
          </Container>
        </Jumbotron>
        <SeriesList source="/api/series/type/algorithms/" />
      </div>
    );

  }

}

export default Algorithms;
